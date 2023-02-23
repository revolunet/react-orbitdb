import React, { useEffect,useState } from "react";
import useAlephIM from "../useAlephIM"
import { useMetaMask,MetaMaskProvider } from "metamask-react";

const AlepIM = (props) => {

    const [myAddress, setMyAddress] = useState({selectedAddress:'not connected'});
    const { status, connect, account, chainId, ethereum, switchChain, addChain } = useMetaMask();
    const {backup,retrieveSnapshot, bla} = useAlephIM()
    useEffect(() => {
        
        const db = props.db;
        console.log("alpIM db rendered",db)
        setMyAddress(ethereum)
    }, [props.db,ethereum]);

    return (

        <div>
            <button onClick={()=>backup(props.db)}>Store Snapshot on AlepIM</button>
            <button onClick={()=>retrieveSnapshot(props.db)}>Retrieve Snapshot from AlepIM</button>
        
            AlephIM! My address: {myAddress?.selectedAddress}
        </div>
        )
}
export default AlepIM