import { useEffect, useState, useContext } from "react";

import orbitContext from "./orbitContext";

const publicRead = (orbitdb) => ({
  accessController: {
    write: [orbitdb.identity.id],
  },
});

const publicWrite = () => ({
  accessController: {
    write: ["*"],
    admin: ["*"],
  },
});

const useOrbitDb = (address, options = {}) => {
  const orbit = useContext(orbitContext);
  const [records, setRecords] = useState(null);
  const [orbitDb, setDb] = useState(null);
  useEffect(() => {
    if (orbitDb) return;
    if (!address) return;

    const createDb = async () => {
      const allOptions = {
        indexBy: "id",
        create: false,
        type: "keyvalue",
        overwrite: false,
        ...options,
        // options.public controls write access
        ...(options.create && options.public
          ? publicWrite(orbit)
          : publicRead(orbit)),
      };

      const db = await orbit.open(address, allOptions);
      const refreshDb = async () => {
        await db.load();
        if (!orbitDb) {
          setDb(db);
        }
        if (db.type === "keyvalue") {
          setRecords({ ...(db.all || {}) });
        } else if (db.type === "eventlog") {
          const allEvents = await db
            .iterator({ limit: -1 })
            .collect()
            .map((e) => e.payload.value);
          setRecords([...allEvents] || []);
        }
      };
      console.log("useOrbitDb.open", address, allOptions);

      db.events.on("replicate", (address) => {
        console.log("replicate", { address });
        //refreshDb();
      });

      db.events.on("replicated", (address) => {
        console.log("replicated", { address });
        refreshDb();
      });

      db.events.on("write", (address, entry, heads) => {
        console.log("write", { address, entry, heads });
        refreshDb();
      });
      await refreshDb();
    };
    if (orbit) {
      createDb();
    }
    return () => {};
  }, [records, orbitDb, orbit, address, options]);

  return { orbit, db: orbitDb, records };
};

export default useOrbitDb;
