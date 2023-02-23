import React, {useState, useEffect} from "react";
import OrbitProvider from "./OrbitProvider";
import {Intro, CounterDemo, EventLogDemo, DocStoreDemo, KeyValueDemo} from "./example/src"
import { useMetaMask } from "metamask-react"
import Identities from 'orbit-db-identity-provider'
import { ethers } from "ethers";

import AlepIM from "./components/AlephIM";
const config = {
    repo: "./ipfs-repo-2023",
    config:
    {  
      Addresses: {
        Swarm: [
        '/dns6/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star',
        '/dns4/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star'
        ]
      }
    }
  }
// const ORBIT_DB_COUNTER = "react-ortbitdb-counter";
const ORBIT_DB_EVENTS = "react-ortbitdb-eventlog";
const ORBIT_DB_COUNTER = "/orbitdb/zdpuAoidY39BFrSouVPkWEuVKbmMawWDdHxSUPpxNdVwvpJii/react-ortbitdb-counter"
// const ORBIT_DB_EVENTS = "/orbitdb/zdpuB1CX1sSzJY67TP4qXDqRtL1pAmQqsHexZnAH7wM9TxMPA/react-ortbitdb-eventlog"
const OriginalApp = (props) => {
      
  const [dbCounter, setDBCounter] = useState(ORBIT_DB_COUNTER) //we use this to set the db name for AlepIM Pinner!
  const [dbEvents, setDBEvents] = useState(ORBIT_DB_EVENTS) 
  const [options, setOptions] = useState(props.options) 
  const [identity, setIdentity] = useState() 

  const { status, connect, account, chainId, ethereum, switchChain, addChain } = useMetaMask();

  useEffect(() => {
    console.log("status",status)
  }, [status])
  useEffect(() => {
    console.log("account now",account)
    console.log("ethereum",ethereum)

    const createIdentity = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const wallet = provider.getSigner();
      const _identity = await Identities.createIdentity({
        type: "ethereum",
        wallet,
      })
      const newOptions = props.options;
      newOptions.identity = _identity
      setOptions(newOptions)
      setIdentity(_identity)
      // console.log("newOptions",newOptions)
    }
    if(identity===undefined)  createIdentity() 
    else console.log("idenditity is",identity)

}, [account]);
      return (
        <div> 
            Original App
            <p>
            <button onClick={()=>connect()}>{account===undefined?'Connect Metamask':account}</button>
            </p>
            <OrbitProvider config={config} options={options}>
              <Intro />
          
              <h2>counter</h2>
                <CounterDemo setDB={setDBCounter} db={dbCounter} options={options} />
               <AlepIM db={dbCounter}/> 
                <br />
                
              {/* <h2>EventLog</h2>
                  <EventLogDemo setDB={setDBEvents} db={dbEvents} options={props.options} provider={props.provider} />
                <AlepIM db={dbEvents}/>*/ }
                <br />
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
            </OrbitProvider>
          </div> 
      )
}

export default  OriginalApp