import { useEffect, useState } from "react";
import OrbitDB from "orbit-db";

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
        console.log("orbit.stop()");
        orbit.stop();
      }
    };
  }, [ipfs]);
  return [orbit];
};

export default useOrbit;
