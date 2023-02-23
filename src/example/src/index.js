import React, { useEffect,useState } from "react";
import { v4 as uuid } from 'uuid';
import { useOrbitDb } from "../../lib";
import { useMetaMask} from "metamask-react";


// window.LOG = "*";
// const ORBIT_DB_COUNTER = "react-ortbitdb-counter";
// const ORBIT_DB_COUNTER = "/orbitdb/zdpuAztsdh7v5kfARfJFFF1natKfbHrEmkZJENFXbuHtQLenz/react-ortbitdb-counter"

const ORBIT_DB_EVENTS = "react-ortbitdb-eventlog";
//"/orbitdb/zdpuB2cZqW3mNmAM1tZ6mNPpcw6bSdNKNgPw4ppqJpnjS8Teg/react-ortbitdb-eventlog";

// const ORBIT_DB_DOCS = "react-ortbitdb-docstore";
const ORBIT_DB_DOCS = "/orbitdb/zdpuAqeFJo4cC7tTDjWeuHMgwdcRRKTNrntzJaPFMSBSBw1jA/react-ortbitdb-docstore/"
//"/orbitdb/zdpuAknUxcYsKArW2d8KtBhwyLfkmADo4wpwmC8ReKy3Q5pDR/react-ortbitdb-docstore";

const ORBIT_DB_KEYVALUE = "react-ortbitdb-keyvalue";
//"/orbitdb/zdpuAod4qh5m3SmjuSVtLUEspqp1yCQABWm1iEdSPFDQ5mUkU/react-ortbitdb-keyvalue";


// const ORBIT_DB_COUNTER = "/orbitdb/zdpuAxgWxVeeSqia2D4TV8i6V8CFR5o3CTEzW4rQu9erkQvbV/react-ortbitdb-counter"
// const ORBIT_DB_COUNTER = "/orbitdb/zdpuAnE3pv17bBFDQeLoz8zsvD4EcBNuMUfRB2YtD7gp7kP29/react-ortbitdb-counter"
// const ORBIT_DB_COUNTER = "/orbitdb/zdpuAm3HjKy98acAPVo6eSC7utPduBo1SMT3foSX85pRTrhcq/react-ortbitdb-counter"
//"/orbitdb/zdpuAzbF3ZzhMsbtw4vkKoP1BEcH1CbgE1fRMUuykQdcbHe7X/react-ortbitdb-counter";
// const ORBIT_DB_COUNTER = "/orbitdb/zdpuB2bk9hwdA6HR4hpErvSWybTDjGtvxvTKAvxMuiZSyWFq5/react-ortbitdb-counter"

export const Intro = () => (
  <div className="jumbotron">
    <h1 className="display-4">react-orbitdb</h1>
    <p className="lead">
      React hooks and providers for dealing with IPFS Orbit-db datasources.
    </p>
    <hr className="my-4" />
    <p>
      On this page you can find different examples of OrbitDB databases. <br />
      Other visitors/browsers can interact in real-time with the data. <br />
      <br />
      <b>No server!</b>
    </p>
    <hr className="my-4" />
    <a
      className="btn btn-outline-primary"
      href="https://github.com/revolunet/react-orbitdb"
      role="button"
    >
      See project on GitHub
    </a>
    &nbsp;
    <a
      className="btn btn-outline-primary"
      href="https://github.com/revolunet/react-orbitdb/blob/master/example/src/index.js"
      role="button"
    >
      This page source code
    </a>
  </div>
);

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const samples = {
  title: ["Dossier", "Article", "Fichier", "Action", "Alerte"],
  tags: [
    "action",
    "urgent",
    "error",
    "warning",
    "closed",
    "todo",
    "doing",
    "wontfix",
  ],
};

const newDocument = () => ({
  _id: uuid(),
  title: pick(samples.title),
  date_created: new Date().toISOString(),
  tags: Array.from(
    new Set([pick(samples.tags), pick(samples.tags), pick(samples.tags)])
  ),
});

const getBadgeVariant = (value) => {
  if (value === "error") {
    return "danger";
  } else if (value === "warning") {
    return "warning";
  } else if (value === "urgent") {
    return "info";
  } else if (value === "closed") {
    return "success";
  }
  return "primary";
};

export const DocStoreDemo = (props) => {
  const { db, records } = useOrbitDb(ORBIT_DB_DOCS, {
    type: "docstore",
    ...props.options
  });
  const addDocument = async () => {
    const doc = newDocument();
    await db.put(doc);
  };

  return (
    <div>
      <p style={{ fontSize: "0.8em" }}>
        {(records && `Connected to ${ORBIT_DB_DOCS}`) ||
          `Connecting to ${ORBIT_DB_DOCS}...`}
      </p>
      {records && (
        <div>
          <h5>
            docs:{" "}
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {records.length}
            </span>{" "}
            <button
              style={{ marginLeft: 10 }}
              className="btn  btn-outline-primary"
              onClick={addDocument}
            >
              Add
            </button>
          </h5>
          <table className="table table-striped">
            <tbody>
              {/* add an hidden row so strip color cycle on each new event */}
              {(records.length % 2 && (
                <tr style={{ display: "none" }}>
                  <td>&nbsp;</td>
                </tr>
              )) ||
                null}
              {records
                .reverse()
                .slice(0, 10)
                .map((record,i) => (
                  <tr key={record.id?record.id:i}>
                    <td>{record.date_created}</td>
                    <td>{record.title}</td>
                    <td>
                      {record.tags.map((tag,j) => (
                        <div
                          key={j}
                          className={`badge badge-${getBadgeVariant(tag)}`}
                          style={{ margin: "0 5px" }}
                        >
                          {tag}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const newKeyValue = () => {
  const id = uuid();
  return [
    id,
    {
      id,
      title: pick(samples.title),
      date_created: new Date().toISOString(),
      tags: Array.from(
        new Set([pick(samples.tags), pick(samples.tags), pick(samples.tags)])
      ),
    },
  ];
};

export const KeyValueDemo = (props) => {
  const { db, records } = useOrbitDb(ORBIT_DB_KEYVALUE, {
    type: "keyvalue",
    ...props.options
  });
  const addKey = async () => {
    const [key, value] = newKeyValue();
    await db.put(key, value);
  };

  return (
    <div>
      <p style={{ fontSize: "0.8em" }}>
        {(records && `Connected to ${ORBIT_DB_KEYVALUE}`) ||
          `Connecting to ${ORBIT_DB_KEYVALUE}...`}
      </p>
      {records && (
        <div>
          <h5>
            keys:{" "}
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {Object.keys(records).length}
            </span>{" "}
            <button
              style={{ marginLeft: 10 }}
              className="btn  btn-outline-primary"
              onClick={addKey}
            >
              Add
            </button>
          </h5>
          <table className="table table-striped">
            <tbody>
              {/* add an hidden row so strip color cycle on each new event */}
              {(Object.keys(records).length % 2 && (
                <tr style={{ display: "none" }}>
                  <td>&nbsp;</td>
                </tr>
              )) ||
                null}
              {Object.keys(records)
                .reverse()
                .slice(0, 10)
                .map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                      <pre style={{ fontSize: 10 }}>
                        {JSON.stringify(records[key], null, 2)}
                      </pre>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const EventLogDemo = (props) => {

  const { status, connect, account, chainId, ethereum, switchChain, addChain } = useMetaMask();

  const { db, records } = useOrbitDb(ORBIT_DB_EVENTS, {
    type: "eventlog",
    create: true,
    ...props.options
  }, props.identity);

  useEffect(() => {
    if(db) {
      props.setDB(db)
      console.log("setting orbitDb", db)}
  }, [db]);

  const addEvent = () => {
    db.add({
      date: new Date().toISOString(),
      ua: navigator.userAgent,
    });
  };

  useEffect(() => {
    if (db) {
      // add an event on first load
      addEvent();
    }
  }, [db]);

  return (
    <div>
      <p style={{ fontSize: "0.8em" }}>
        {(records && `Connected to ${db?.id}`) ||
          `Connecting to ${ORBIT_DB_EVENTS}...`}
      </p>
      {records && (
        <div>
          <h5>
            events:{" "}
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {records.length}
            </span>{" "}
            <button
              style={{ marginLeft: 10 }}
              className="btn btn-outline-primary"
              onClick={addEvent}
            >
              Add
            </button>
          </h5>
          <table className="table table-striped">
            <tbody>
              {/* add an hidden row so strip color cycle on each new event */}
              {(records.length % 2 && (
                <tr style={{ display: "none" }}>
                  <td>&nbsp;</td>
                </tr>
              )) ||
                null}
              {records
                .reverse()
                .slice(0, 10)
                .map((record,i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 10 }}>
                      {record?.date}-{record?.ua}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const CounterDemo = (props) => {

  const { inc, value, db } = useOrbitDb( props.db, {
    type: "counter",
    create: true,
    ...props.options
  });
  useEffect(() => {
    console.log("props.options",props.options)
  }, [props.options])
  console.log("identity.db",db?.identity)

  useEffect(() => {
    console.log("db changed",db)
    if(db) props.setDB(db)
  }, [db]);

  if(props.db===undefined){
    console.log("please provide orbit db prop as the orbit db name  ")
    return <div> db prop undefined </div>
  }
  const add = () => {
    inc();
  };
  return (
    <div>
      <p style={{ fontSize: "0.8em" }}>
        {(value !== undefined && `Connected to ${db.id}`) || `Connecting to ${props.db}...`}
      </p>
      <p style={{ fontSize: "0.8em" }}> {(props.options?.identity !== undefined && ` id is ${props.options.identity.id}`) || ` ${props.options?.identity?.id}...`} </p>
      {value !== undefined && (
        <h1>
          <span
            className="badge badge-primary"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {value}
          </span>
          <button
            style={{ marginLeft: 10 }}
            className="btn btn-outline-primary"
            onClick={add}
          >
            Add
          </button>
        </h1>
      )}
    </div>
  );
};