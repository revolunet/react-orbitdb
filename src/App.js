import React, {useState,useEffect} from "react";

import OrbitProvider from "./OrbitProvider";
import Identities from 'orbit-db-identity-provider'
import {Intro, CounterDemo, EventLogDemo, DocStoreDemo, KeyValueDemo} from "./example/src"
import {ArticelsFrame} from "./blog/src/index";

const App = () => {
  
  const [identity, setIdentity] = useState();
  
  useEffect(() => {
      const init = async () => {
        const _identity = await Identities.createIdentity({ id: "user" })
        console.log("App.identity",_identity)
        setIdentity(_identity)
      }
      init()
      }
  ,[])

  const config = {
    repo: "./ipfs-repo",
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
  console.log(config)
   
return ( 
    <div>
      <OriginalApp/>
        <OrbitProvider config={config} options={{identity: identity}}>

        <ArticelsFrame/>
      </OrbitProvider>
    </div>
    )
}

const OriginalApp = () => (
  <div>
    <OrbitProvider config={config} options={{identity: identity}}>
      <Intro />
      <h2>counter</h2>
      <CounterDemo />
      <br />
      <h2>eventlog</h2>
      <EventLogDemo />
      <br />
      <h2>docstore</h2>
      <DocStoreDemo />
      <br />
      <h2>keyvalue</h2>
      <KeyValueDemo />
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </OrbitProvider>
  </div>
);

export default App;

