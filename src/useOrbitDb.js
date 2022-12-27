import { useEffect, useState, useContext } from "react";
import Logger from "logplease";

import orbitContext from "./orbitContext";

const logger = Logger.create("useOrbitDb");

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

    const createDb = async (dbAddress) => {

      logger.debug("orbit.create", address);
      const allOptions = {
        accessController: {
          type: 'orbitdb'
        },
        ...options
      }
      // const allOptions = {
      //   indexBy: "id",
      //   create: true, // doesnt really work ?
      //   type: "keyvalue",
      //   overwrite: false,
      //   ...options,
      //   // // options.public controls write access
      //   ...(options.create && options.public
      //     ? publicWrite(orbit)
      //     : publicRead(orbit)),
      // };

      // const dbAddress = await orbit.determineAddress(
      //   address,
      //   allOptions.type,
      //   allOptions
      // );

      logger.debug("orbit.open", dbAddress, allOptions);

      const db = await orbit.feed(dbAddress, allOptions)
      // const db = await orbit.open(dbAddress, allOptions);
      logger.debug("orbitdb.opened", db.address.toString());

      const refreshDb = async () => {
        await db.load();
        if (!orbitDb) {
          setDb(db);
        }
        if (db.type === "keyvalue") {
          setRecords({ ...(db.all || {}) });
        } else if (db.type === "eventlog" || db.type === "feed") {
          const allEvents = []
          db.all.map((obj) => allEvents.push(obj.payload.value));
          setRecords(allEvents);
        } else if (db.type === "docstore") {
          setRecords(db.query(() => true));
        } else if (db.type === "counter") {
          setRecords(db.value);
        }
      }
      db.events.on("ready", () => {
        // logger.debug("db.events.ready", address.toString());
        // db.all.map((obj) => logger.debug(obj.payload));
        // refreshDb();
      });

      db.events.on("replicate", (address) => {
        logger.debug("db.events.replicate", address.toString());
        //refreshDb();
      });

      db.events.on("replicated", (address) => {
        logger.debug("db.events.replicated", address.toString());
        refreshDb();
      });

      db.events.on("write", (address) => {
        logger.debug("db.events.write", address.toString());
        refreshDb();
      });

      db.events.on("error", (err) => {
        logger.debug("db.events.error", err);
        refreshDb();
      });
      await refreshDb();
    };
    if (orbit) {
      createDb(address);
    }
    return () => {
      if (orbitDb) {
        logger.debug("db.close()");
        orbitDb.close();
      }
    };
  }, [orbit, address, options]);

  const state = { orbit, db: orbitDb, records };
  if (orbitDb && orbitDb.type === "counter") {
    state.inc = orbitDb.inc.bind(orbitDb);
    state.value = orbitDb.value;
  }
  return state;
};

export default useOrbitDb;
