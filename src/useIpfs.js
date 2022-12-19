import { useEffect, useState } from "react";
import Logger from "logplease";
import {create} from 'ipfs'

const logger = Logger.create("useIpfs");

// window.ipfsLoaded hack to keep a global ipfs instance
const useIpfs = (config) => {
  const [ipfs, setIpfs] = useState(null);

  useEffect(() => {
    const ipfsInit = async () => {
      logger.info("ipfsInit", config);
      if (typeof window !== "undefined" && window.ipfsLoaded) {
        setIpfs(window.ipfsLoaded);
        return;
      }

      const ipfs = await create(config);
      if (typeof window !== "undefined") window.ipfsLoaded = ipfs;
      const peerId = (await ipfs.id()).id;
      logger.info("IPFS: connected as", peerId);
      setIpfs(ipfs);
    };
    ipfsInit();
    return () => {
      if (ipfs) {
        logger.debug("ipfs.stop()");
        ipfs.stop();
      }
    };
  }, [ipfs, config]);

  return [ipfs];
};

export default useIpfs;
