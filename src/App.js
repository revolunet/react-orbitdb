import React, {useState,useEffect} from "react";
import { MetaMaskProvider } from "metamask-react"
import Identities from 'orbit-db-identity-provider'
import OriginalApp from "./OriginalApp";
// import detectEthereumProvider from '@metamask/detect-provider';
const App = () => {
  
  const [identity, setIdentity] = useState();
  const [provider, setProvider] = useState();
  
  useEffect(() => {
      const init = async () => {
        const _identity = await Identities.createIdentity({ id: "user" })
        console.log("App.identity",_identity)
        setIdentity(_identity)
      }
      init()
      }
  ,[])  
  return ( 
    <MetaMaskProvider><OriginalApp options={{identity,'create':true, 'repo':'./testRepo2023-01'}}/></MetaMaskProvider>)
        // 
// <App />
// 
// return ( 
//     <div> 
//     <OrbitProvider config={config} options={identity}>
//       <ArticelsFrame />
//       </OrbitProvider>
//     </div>
//     )
}

// const config = {
//   repo: "./ipfs-repo",
//   config:
//   {  
//     Addresses: {
//       Swarm: [
//       '/dns6/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star',
//       '/dns4/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star'
//       ]
//     }
//   }
// }

export default App;


