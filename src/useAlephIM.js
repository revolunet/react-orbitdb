import { useEffect, useState, useContext } from "react";
import Logger from "logplease";
import multiaddr from 'multiaddr'
import { peerIdFromString } from '@libp2p/peer-id'
import { useMetaMask} from "metamask-react";
import { accounts, messages } from 'aleph-sdk-ts'
import orbitContext from "./orbitContext";
const logger = Logger.create("usePowergate");

const useAlephIM = () => {

    const orbit = useContext(orbitContext);
    useEffect(() => {
// processes a circuit-relay announce over pubsub
const processAnnounce = async (addr) => {
  // get our peerid 
  const browserIpfs = orbit._ipfs; 
  let me = await browserIpfs.id();
  me = me.id;

  // not really an announcement if it's from us
  if (addr.from == me) {
      return;
  }

  // if we got a keep-alive, nothing to do
  if (addr == "keep-alive") {
      console.log(addr);
      return;
  }

  const peer = addr.split("/")[9];
  console.log("Peer: " + peer);
  console.log("Me: " + me);
  if (peer == me) { // return if the peer being announced is us
      return;
  }

  // get a list of peers
  const peers = await browserIpfs.swarm.peers();
  for (let i in peers) {
      // if we're already connected to the peer, don't bother doing a
      // circuit connection
      if (peers[i].peer == peer) {
          return;
      }
  }
  // log the address to console as we're about to attempt a connection
  console.log(addr);

  // connection almost always fails the first time, but almost always
  // succeeds the second time, so we do this:
  try {
      await browserIpfs.swarm.connect(addr);

  } catch(err) {
      console.log(err);
      await browserIpfs.swarm.connect(addr);
  }
  
  subscribe_announce()

  const subscribe_announce = async () => {
    const browserIpfs = orbit._ipfs;
    await browserIpfs.pubsub.subscribe("announce-circuit", processAnnounce);
  }

  setInterval(function(){
    const browserIpfs = orbit._ipfs;
    browserIpfs.pubsub.publish("announce-circuit", "peer-alive");}, 15000);
  }
  if(orbit!==null) processAnnounce()
  },[])

// process announcements over the relay network, and publish our own
// keep-alives to keep the channel alive


    const { status, connect, account, chainId, ethereum, switchChain, addChain } = useMetaMask();


    const retrieveSnapshot = (db) => {
      console.log("retrieveSnapshot",status)
      connect()
      console.log('ethereum',ethereum)
    }

    const backup = async (db) => {
      connect()
    
      const browserIpfs = orbit._ipfs; 
      const browserIpfsId = await browserIpfs.id()
      console.log("browserIPFS.id",browserIpfsId)
              // Connect to the Powergate IPFS node
      // const maddr = multiaddr("/dns4/ipfs.le-space.de/tcp/4003/wss/p2p/12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t")
      const peerId = peerIdFromString('12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t')
  
      // return
      // console.log("ping response",res)
      // await browserIpfs.swarm.connect(maddr)
     // console.log("res",res)
      // console.log("peers",browserIpfs.swarm)


      // const connected0 = await browserIpfs.swarm.connect(multiaddr('/dns4/ipfs.le-space.de/tcp/4003/wss/p2p/12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t'));
      // console.log('connected0', connected0);

      //
      const res = await browserIpfs.bootstrap.add(multiaddr('/dns4/ipfs.le-space.de/tcp/4003/wss/p2p/12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t'))
      console.log("bootstrap.add",res)
      const peers = await browserIpfs.bootstrap.list()
      console.log("peers connected",peers.Peers[0].toString())
      // console.log("peers",peers[0].addr.toString())
         // '/dns4/ipfs.le-space.de/tcp/4003/wss/p2p/12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t',
        // '/dns6/ipfs.le-space.de/tcp/4003/wss/p2p/12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t'
      const account =  await accounts.ethereum.GetAccountFromProvider(window.ethereum)
      console.log("current account",account)
      console.log("db",db)
      await db.load()
      const snapshot = await db.saveSnapshot()
      const cid = snapshot[0].hash
      console.log('cid of last snapshot is',cid)
      const msg = await messages.store.Pin({
        APIServer: 'https://api2.aleph.im',
        account,
        fileHash: cid.toString(),
        // The channel you use has no effect on the process
        // "PINNING" is the name used on Aleph Account
        channel: 'PINNING',
      })
      console.log('msg',msg)
      console.log("pinned cid",cid.toString())
      console.log("messages.store",messages.store)

      const decoder = new TextDecoder()
      let text = ''
    
      for await (const chunk of browserIpfs.cat(cid.toString())) {
        text += decoder.decode(chunk, {
          stream: true
        })
      }
    
      console.log("Added file contents:", text);
      const pings = await browserIpfs.ping(peerId);
      for await (const res of pings) {
        console.log(`Ping response time: ${res.time}ms`,res);
        // break;
      }
    }

      return {retrieveSnapshot,backup, bla:"super"}
}
export default useAlephIM
  // const provider = MetaMaskProvider()

  // connect()