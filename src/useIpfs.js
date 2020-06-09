import { useEffect, useState } from "react";

import IPFS from "ipfs";

// window.ipfsLoaded hack to keep a global ipfs instance
const useIpfs = (config) => {
  const [ipfs, setIpfs] = useState(null);

  useEffect(() => {
    const ipfsInit = async () => {
      console.log("ipfsInit", config);
      if (typeof window !== "undefined" && window.ipfsLoaded) {
        setIpfs(window.ipfsLoaded);
        return;
      }

      const ipfs = await IPFS.create(config);
      if (typeof window !== "undefined") window.ipfsLoaded = ipfs;
      const peerId = (await ipfs.id()).id;
      console.log("IPFS: connected as", peerId);
      setIpfs(ipfs);
    };
    ipfsInit();
    return () => {
      if (ipfs) {
        console.log("ipfsStop");
        ipfs.stop();
      }
    };
  }, [ipfs, config]);

  return [ipfs];
};

export default useIpfs;
