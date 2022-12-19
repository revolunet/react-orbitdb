import React from "react";

import OrbitProvider from "./OrbitProvider";
import {Intro, CounterDemo, EventLogDemo, DocStoreDemo, KeyValueDemo} from "./example/src"

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

export default App;

