import React, { useEffect, useState } from "react";

import DEFAULT_IPFS_CONFIG from "./ipfs-config";
import useIpfs from "./useIpfs";
import useOrbit from "./useOrbit";
import orbitContext from "./orbitContext";

export const OrbitProvider = ({ config = DEFAULT_IPFS_CONFIG, ...props }) => {
  const [ipfs] = useIpfs(config);
  const [orbit] = useOrbit(ipfs);
  const [value, setValue] = useState(null);
  const { Provider } = orbitContext;
  useEffect(() => {
    console.log("ipfs", ipfs, orbit);
    if (ipfs && orbit) {
      setValue(orbit);
    }
    //setValue(orbit)
  }, [ipfs, orbit]);
  console.log("OrbitProvider", { value, ipfs, orbit });
  return <Provider value={value} {...props} />;
};

export default OrbitProvider;
