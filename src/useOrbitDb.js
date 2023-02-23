import { useEffect, useState, useContext } from "react";
import Logger from "logplease";
import orbitContext from "./orbitContext";

const logger = Logger.create("useOrbitDb");

const useOrbitDb = (address, options = {}) => {

  const orbit = useContext(orbitContext);
  const [records, setRecords] = useState(null);
  const [orbitDb, setDb] = useState(null);

  useEffect(() => {

    if (orbitDb) return;
    if (!address) return;
    
    const createDb = async (address) => {

      console.log("create db",address)
      logger.debug("orbit.create", address);

      const allOptions = {
        create: true, 
        // accessController: {
        //   write: ['*'],
        // },
        accessController: {
          type: 'orbitdb'
        },
        ...options
      }

      // if(identity) allOptions.identity = identity

      console.log("allOptions",allOptions)
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
      // console.log('orbit.open')
      // logger.debug("orbit.open", dbAddress, allOptions);

      const db = await orbit.open(address, allOptions);
      console.log("opened",db)
      const refreshDb = async () => {
        await db.load();
        if (!orbitDb) {
          setDb(db);
        }
        if (db.type === "keyvalue") {
          console.log(db.all)
          // setRecords(db.all!==undefined?db.all:{});
          setRecords({ ...(db.all || {}) });
        } else if (db.type === "eventlog"){
          const allEvents = await db
            .iterator({ limit: -1 })
            .collect()
            .map((e) => e.payload.value);
          setRecords([...allEvents] || []);

        } else if (db.type === "feed") {
          const allEvents = []
          console.log(db.all)
          db.all.map((obj) => obj?.payload?.value?allEvents.push(obj?.payload?.value):undefined);
          
          setRecords(allEvents);
          // setRecords(...(db.all.map((obj) => obj?.payload?.value) || []));
            // setRecords(db.all.map((obj) => obj?.payload?.value));
        } else if (db.type === "docstore") {
          setRecords(db.query(() => true));
        } else if (db.type === "counter") {
          setRecords(db.value);
        }
      }
      
      db.events.on("ready", () => {
        logger.debug("db.events.ready", address.toString());
        // db.all.map((obj) => logger.debug(obj.payload));
        // refreshDb();
      });

      db.events.on('replicate.progress', (dbAddress, hash, entry) => {
        // if (entry.next.length === 0) {
        //   replicationComplete = true
        // }
      })

      db.events.on("replicate", (address) => {
        logger.debug("db.events.replicate", address.toString());
        refreshDb();
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
        // logger.debug("db.events.error", err);
        refreshDb();
      });
      await refreshDb();
    };
    if (orbit) {
      createDb(address);
    }
    console.log("something reloaded")
    return () => {
      if (orbitDb) {
        // logger.debug("db.close()");
        orbitDb.close();
      }
    };

  }, [orbit, address, options]);

  const state = { orbit, db: orbitDb, records };
  if (orbitDb && orbitDb.type === "counter") {
    state.inc = orbitDb.inc.bind(orbitDb);
    state.value = orbitDb.value;
    state.db = orbitDb
  }
  return state;
};

export default useOrbitDb;
