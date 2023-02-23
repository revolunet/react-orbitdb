import {webSockets} from '@libp2p/websockets'
import { all,dnsWss } from '@libp2p/websockets/filters'
const ws = new webSockets({
  //   all    👇 allow all WebSocket connections  
  // https://github.com/ipfs/js-ipfs/issues/4185
  // https://github.com/libp2p/js-libp2p-websockets#libp2p-usage-example
  filter: all,
})
const DEFAULT_IPFS_CONFIG = {
  start: true,
  relay: {
    enabled: true, // enable relay dialer/listener (STOP)
    hop: {
      enabled: true, // make this node a relay (HOP)
    },
  },
  preload: {
    enabled: false,
  },
  repo: "./example2",
  EXPERIMENTAL: { pubsub: true },
  libp2p: {
    transports: [ws],
    connectionManager: {
      autoDial: false,
    },
  },
  config: {
    transports: [ws],
    Bootstrap: [
      // '/p2p-circuit/ipfs/12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t',
      // '/dns4/ipfs.le-space.de/tcp/4003/wss/p2p/12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t',
      // '/dns6/ipfs.le-space.de/tcp/4003/wss/p2p/12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t'
    ],
    Addresses: {
      Swarm: [
        // '/dns4/ipfs.le-space.de/tcp/4003/wss/p2p/12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t',
        // '/dns6/ipfs.le-space.de/tcp/4003/wss/p2p/12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t'
        // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
        // '/dns4/ipfs.infura.io/tcp/443/wss/p2p-webrtc-star',
        // '/p2p-circuit/ipfs/12D3KooWALjeG5hYT9qtBtqpv1X3Z4HVgjDrBamHfo37Jd61uW1t',
        '/dns6/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star',
        '/dns4/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star'
      ],
    },
  },
};

export default DEFAULT_IPFS_CONFIG;
