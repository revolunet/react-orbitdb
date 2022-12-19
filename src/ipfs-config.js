const DEFAULT_IPFS_CONFIG = {
  start: true,
  relay: {
    enabled: false, // enable relay dialer/listener (STOP)
    hop: {
      enabled: false, // make this node a relay (HOP)
    },
  },
  preload: {
    enabled: false,
  },
  repo: "./example",
  EXPERIMENTAL: { pubsub: true },
  config: {
    Bootstrap: [
      //"/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",
      // "/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3",
      // "/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM",
      // "/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu",
      // "/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm",
      // "/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64",
      // "/dns4/ipfs-ws.vps.revolunet.com/tcp/443/wss/ipfs/QmSEbJSiV8TXyaG9oBJRs2sJ5sttrNQJvbSeGe7Vt8ZBqt",
    ],
    Addresses: {
      Swarm: [
        '/dns6/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star',
        '/dns4/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star',
        //"/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star",
        // "/dns4/star-signal.cloud.ipfs.team/tcp/443/wss/p2p-webrtc-star",
        // "/dns4/libp2p-rdv.vps.revolunet.com/tcp/443/wss/p2p-webrtc-star",
        //const addr = multiaddr('/ip4/188.166.203.82/tcp/20000/wss/p2p-webrtc-star/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSooo2a')
        //"/dns4/ipfs-ws.vps.revolunet.com/tcp/443/wss/ipfs/QmSEbJSiV8TXyaG9oBJRs2sJ5sttrNQJvbSeGe7Vt8ZBqt",
        //"/dns4/ws-star1.par.dwebops.pub/tcp/443/wss/p2p-websocket-star",
      ],
    },
  },
};

export default DEFAULT_IPFS_CONFIG;
