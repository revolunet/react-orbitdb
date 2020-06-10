import { useEffect, useState } from "react";
import OrbitDB from "orbit-db";
import Logger from "logplease";

const logger = Logger.create("useOrbit");

const useOrbit = (ipfs) => {
  const [orbit, setOrbit] = useState(null);

  useEffect(() => {
    const createInstance = async () => {
      const instance = await OrbitDB.createInstance(ipfs);
      setOrbit(instance);
    };
    if (ipfs) createInstance();
    return () => {
      if (orbit && orbit.stop) {
        logger.debug("orbit.stop()");
        orbit.stop();
      }
    };
  }, [ipfs]);
  return [orbit];
};

export default useOrbit;
