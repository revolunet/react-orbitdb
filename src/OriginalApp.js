// import React, {useState, useEffect} from "react";
import OrbitProvider from "./OrbitProvider";
import {Intro, CounterDemo, EventLogDemo, DocStoreDemo, KeyValueDemo} from "./example/src"

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

const OriginalApp = (props) => {
  
      return (
        <div>
        Original App
          <OrbitProvider config={config} options={props.options}>
            <Intro />
            <h2>counter</h2>
            <CounterDemo  options={props.options}/>
            <br />
            <h2>eventlog</h2>
            <EventLogDemo  options={props.options}/>
            <br />
            <h2>docstore</h2>
            <DocStoreDemo  options={props.options}/>
            <br />
            <h2>keyvalue</h2>
            <KeyValueDemo  options={props.options}/>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </OrbitProvider>
        </div>
      )
}

export default  OriginalApp