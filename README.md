# react-orbitdb

[![](https://img.shields.io/badge/License-Apache--2.0-yellow.svg)](https://opensource.org/licenses/Apache-2.0)
[![](https://img.shields.io/npm/v/react-orbitdb.svg)](https://www.npmjs.com/package/react-orbitdb)

react hooks and providers for dealing with [IPFS](https://ipfs.io) [orbit-db datasources](https://github.com/orbitdb/orbit-db).

You can see a demo here : https://revolunet.github.io/react-orbitdb

## Provider

`OrbitProvider` creates a shared IPFS Node and an orbit-db instance.

```js
import { OrbitProvider } from "react-orbitdb";

const App = () => <OrbitProvider>...</OrbitProvider>;
```

- `config` prop with ipfs configuration can be passer to the provider. (see the [default](./src/ipfs-config.js)

## Hooks

#### useOrbitDb

`useOrbitDb` connects and return records from an OrbitDB database. `records` are updated in real-time.

```jsx
import { useOrbitDb } from "react-orbitdb";

const MyCmp = () => {
  const { db, records } = useOrbitDb(dbAddress, options);

  return (
    <div>
      {records &&
        records.map((record) => <div key={record.id}>{record.message}</div>)}
    </div>
  );
};
```

- `options` : [OrbitDB.open options](https://github.com/orbitdb/orbit-db/blob/master/API.md#orbitdbopenaddress-options)
  - the `options.create` and `options.public` values set the database world-writeable when you first create it.

#### useOrbit

`useOrbit` is included in `OrbitProvider`, you should not need it

#### useIpfs

`useIpfs` is included in `OrbitProvider`, you should not need it
