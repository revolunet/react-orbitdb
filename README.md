# react-orbitdb

react hooks and providers for dealing with [IPFS](https://ipfs.io) [orbit-db datasources](https://github.com/orbitdb/orbit-db).

## Provider

`OrbitProvider` creates a shared IPFS Node and an orbit-db instance.

```js
const App = () => <OrbitProvider>...</OrbitProvider>;
```

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
