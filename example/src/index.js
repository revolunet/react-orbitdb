import React, { useEffect } from "react";
import { render } from "react-dom";
import uuid from "uuid";

import { OrbitProvider, useOrbitDb } from "../../src";

window.LOG = "*";

const ORBIT_DB_EVENTS =
  "/orbitdb/zdpuB2cZqW3mNmAM1tZ6mNPpcw6bSdNKNgPw4ppqJpnjS8Teg/react-ortbitdb-eventlog";

const ORBIT_DB_DOCS =
  "/orbitdb/zdpuAknUxcYsKArW2d8KtBhwyLfkmADo4wpwmC8ReKy3Q5pDR/react-ortbitdb-docstore";

const ORBIT_DB_KEYVALUE =
  "/orbitdb/zdpuAod4qh5m3SmjuSVtLUEspqp1yCQABWm1iEdSPFDQ5mUkU/react-ortbitdb-keyvalue";

const ORBIT_DB_COUNTER =
  "/orbitdb/zdpuAzbF3ZzhMsbtw4vkKoP1BEcH1CbgE1fRMUuykQdcbHe7X/react-ortbitdb-counter";

const Intro = () => (
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
  id: uuid(),
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

const DocStoreDemo = () => {
  const { db, records } = useOrbitDb(ORBIT_DB_DOCS, {
    type: "docstore",
    create: true,
    public: true,
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
                .map((record) => (
                  <tr key={record.id}>
                    <td>{record.date_created}</td>
                    <td>{record.title}</td>
                    <td>
                      {record.tags.map((tag) => (
                        <div
                          key={tag}
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

const KeyValueDemo = () => {
  const { db, records } = useOrbitDb(ORBIT_DB_KEYVALUE, {
    type: "keyvalue",
    create: true,
    public: true,
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

const EventLogDemo = () => {
  const { db, records } = useOrbitDb(ORBIT_DB_EVENTS, {
    type: "eventlog",
    create: true,
    public: true,
  });
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
        {(records && `Connected to ${ORBIT_DB_EVENTS}`) ||
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
                .map((record) => (
                  <tr key={record.date}>
                    <td style={{ fontSize: 10 }}>
                      {record.date}-{record.ua}
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

const CounterDemo = () => {
  const { inc, value } = useOrbitDb(ORBIT_DB_COUNTER, {
    type: "counter",
    create: true,
    public: true,
  });
  const add = () => {
    inc();
  };
  return (
    <div>
      <p style={{ fontSize: "0.8em" }}>
        {(value && `Connected to ${ORBIT_DB_COUNTER}`) ||
          `Connecting to ${ORBIT_DB_COUNTER}...`}
      </p>
      {value && (
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

const App = () => (
  <div>
    <OrbitProvider>
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

//const Demo = () => <div>io</div>;

render(<App />, document.getElementById("root"));
