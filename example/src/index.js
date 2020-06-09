import React, { useEffect } from "react";
import { render } from "react-dom";
import uuid from "uuid";

import { OrbitProvider, useOrbitDb } from "../../src";

window.LOG = "*";

const ORBIT_DB_EVENTS =
  "/orbitdb/zdpuB2cZqW3mNmAM1tZ6mNPpcw6bSdNKNgPw4ppqJpnjS8Teg/react-ortbitdb-eventlog";

const ORBIT_DB_DOCS =
  "/orbitdb/zdpuAknUxcYsKArW2d8KtBhwyLfkmADo4wpwmC8ReKy3Q5pDR/react-ortbitdb-docstore";

const Intro = () => (
  <div className="jumbotron">
    <h1 className="display-4">react-orbitdb</h1>
    <p className="lead">
      React hooks and providers for dealing with IPFS Orbit-db datasources.
    </p>
    <hr className="my-4" />
    <a
      className="btn btn-outline-primary"
      href="https://github.com/revolunet/react-orbitdb"
      role="button"
    >
      See on GitHub
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
    overwrite: true,
    public: true,
  });
  const addDocument = async () => {
    const doc = newDocument();
    await db.put(doc);
  };

  return (
    <div>
      <p style={{ fontSize: "0.8em" }}>
        {(records && `Connected to ${ORBIT_DB_EVENTS}`) ||
          `Connecting to ${ORBIT_DB_EVENTS}...`}
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
              {records.map((record) => (
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

const EventLogDemo = () => {
  const { db, records } = useOrbitDb(ORBIT_DB_EVENTS, {
    type: "eventlog",
    create: true,
    overwrite: true,
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
      console.log("add an event on first load");
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
              className="btn  btn-outline-primary"
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
                .slice(0, 5)
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

const App = () => (
  <div>
    <OrbitProvider>
      <Intro />
      <h2>eventlog</h2>
      <EventLogDemo />
      <h2>docstore</h2>
      <DocStoreDemo />
    </OrbitProvider>
  </div>
);

//const Demo = () => <div>io</div>;

render(<App />, document.getElementById("root"));
