import { useEffect, useState } from "react";
import useOrbitDb from "../../useOrbitDb"
import Identities from 'orbit-db-identity-provider'
import Logger from "logplease";
Logger.setLogLevel(Logger.LogLevels.DEBUG) 

export const ArticelsFrame = () => {

    const [identity, setIdentity] = useState();
  
    useEffect(() => {
        const init = async () => {
          const _identity = await Identities.createIdentity({ id: "user" })
          console.log("ArticelsFrame.identity",_identity)
          setIdentity(_identity)
        }
        init()
        }
    ,[])

    const { db, records } = useOrbitDb("/orbitdb/zdpuAwvjEAmyoeLr3sghDNhpGN4vdX2N5dSjqBfXjsEN1cXpJ/nicokrause.com-22", {
        type: "feed",
        identity
    })
    console.log(records)
    const listItems = records?records.map((ob,i) => {
          return <li key={i}>{ob.subject}</li>;
        })
      : "";

    return (
      <div>
          ArticelFrame
          {listItems}
      </div>
    );
}