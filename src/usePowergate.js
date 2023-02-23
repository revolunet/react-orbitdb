import { useEffect, useState, useContext } from "react";
import Logger from "logplease";
import PowergateIO from "@decentrasol/orbit-db-powergate-io"
import multiaddr from 'multiaddr'
import orbitContext from "./orbitContext";

const logger = Logger.create("usePowergate");

// const powUser = {
//   "user": {
//     "id": "07efd80a-f889-4d0c-8145-a52a7d6c2f8c",
//     "token": "656e6841-94f7-441c-90fa-62f4d9fa7f47"
//   }
// }

const usePowergate = (powUser, powergate_href) => {

    const orbit = useContext(orbitContext);
    const POWERGATE_HREF = powergate_href || "http://localhost:6003";
    const [powergate, setPowergate] = useState();

    useEffect(() => {

        const loadPowerGate = async () => {
            logger.debug("token",powUser.user.token)
            let powAddresses
            let _powergateio 
            try {  
                _powergateio = await PowergateIO.create(POWERGATE_HREF,powUser.user.token);
                setPowergate(_powergateio)
                powAddresses = (await _powergateio.ipfs.id()).addresses;
            }catch(ex){
                    logger.error(ex)
                throw Error("do you have a valid powergate token from command line? (./pow admin users create)")
            }

            console.log("powergate addresses",powAddresses)
            powAddresses.forEach(it => {
                console.log(it.toString())
            });

            //TODO if powergate is not on localhost please fix this part https://github.com/inspiraluna/orbit-db-powergate-io/blob/main/test/powergate.test.js#L203
            //TODO this code is used in browser only "wss", "wss/p2p-webrtc-star" or webtransport peers could be called.

            const IS_REMOTE = false
            if (IS_REMOTE) {
                // addresses = filterPublicMultiaddr(addresses);
            } else {
                powAddresses = powAddresses
                .filter((a) => a.toString().indexOf("127.0.0.1") !== -1)
                .filter((a) => a.toString().indexOf("/ws/") !== -1);
            }

            //TODO improve this hack
            let connectAddress = powAddresses[0].toString()
            connectAddress = connectAddress.replace('/ip4/','/dns4/')
            connectAddress = connectAddress.replace('/127.0.0.1/','/localhost/')
            connectAddress = connectAddress.replace('8081','4003')
            connectAddress = connectAddress.replace('/ws/','/wss/')
            console.log("powergate addresses after filter",connectAddress)

            const browserIpfs = orbit._ipfs; 
            const browserIpfsId = await browserIpfs.id()
            console.log("browserIPFS.id",browserIpfsId)
                    // Connect to the Powergate IPFS node
            const maddr = multiaddr(connectAddress)
            await browserIpfs.swarm.connect(maddr)
            const peers = await _powergateio.ipfs.swarm.peers();
            console.log("peers",peers)
        }

        loadPowerGate()
        return () => { PowergateIO.stop() }
        
    },[])

    /**
     * Example usage to retrieve from Filecoin
     */
    const retrieveSnapshotAndUpdate = async (powergate, db) => {
        const snapshots = await powergate.retrieveSnapshot(db.address.toString());
        console.log(`found snapshots for db on filecoin ${db.address.toString()}`,snapshots.length)
        if(snapshots!==undefined && snapshots.length>0){
            console.log("snapshots made", snapshots);

            await db._oplog.join(snapshots[0].log)
            console.log("oplog joined");
            await db._updateIndex()
            console.debug("db index updated");
        }else {
            console.log("no snapshots to sync on filecoin")
        } 
    }

    /**
     * Example usage to store on Filecoin (and find out how to watch jobStatus)
     * @param {db} ordbit db to store on file coin
     */
    const storeOnFileCoin = async (powergate, db) => {
       const jobStatus = await powergate.storeSnapshot(db.address.toString())
       console.log(jobStatus)
    }

    return powergate
}
export default usePowergate;