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
    Bootstrap: [],
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
