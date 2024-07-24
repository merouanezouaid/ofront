import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
let peer: RTCPeerConnection | null = null;
let remoteSocket: string = '';
let type: string = '';
let roomid: string = '';

const myVideoElement: HTMLVideoElement | null = null;
const strangerVideoElement: HTMLVideoElement | null = null;

export function initializeSocket(onQuestion: (q: string) => void, onLoading: (loading: boolean) => void, onMessage: (sender: string, text: string) => void, myVideoRef: HTMLVideoElement,
strangerVideoRef: HTMLVideoElement) {
  if (!socket) {
    socket = io('https://oback.vercel.app');

    socket.on('disconnected', () => {
      window.location.href = '/?disconnect';
    });

    socket.on('remote-socket', (id: string) => {
      remoteSocket = id;
      onLoading(false);
      
      peer = new RTCPeerConnection();

      peer.onnegotiationneeded = async () => {
        if (type === 'p1') {
          const offer = await peer!.createOffer();
          await peer!.setLocalDescription(offer);
          socket?.emit('sdp:send', { sdp: peer!.localDescription });
        }
      };

      peer.onicecandidate = e => {
        socket?.emit('ice:send', { candidate: e.candidate, to: remoteSocket });
      };

      initializeWebRTC(myVideoRef, strangerVideoRef)

    });

    socket.on('question', (q: string) => {
      onQuestion(q);
    });

    socket.on('roomid', (id: string) => {
      roomid = id;
    });

    socket.on('get-message', (input: string, msgType: string) => {
      onMessage('Stranger', input);
    });

    socket.emit('start', (person: string) => {
      type = person;
    });
  }
}


export function initializeWebRTC(myVideoRef: HTMLVideoElement, strangerVideoRef: HTMLVideoElement) {
  navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then(stream => {
      if(peer){
        myVideoRef!.srcObject = stream;
        stream.getTracks().forEach(track => peer!.addTrack(track, stream));
  
        console.log("peer: " + peer)
        console.log("on track" + peer.ontrack)
  
        peer.ontrack = e => {
          strangerVideoRef!.srcObject = e.streams[0];
          strangerVideoRef!.play().catch(error => {
            console.error('Error playing video:', error);
          });
        };
      }
    })
    .catch(ex => {
      console.log(ex);
    });

  if (socket) {
    socket.on('sdp:reply', async ({ sdp }: { sdp: RTCSessionDescriptionInit }) => {
      await peer!.setRemoteDescription(new RTCSessionDescription(sdp));
      if (type === 'p2') {
        const ans = await peer!.createAnswer();
        await peer!.setLocalDescription(ans);
        socket?.emit('sdp:send', { sdp: peer!.localDescription });
      }
    });

    socket.on('ice:reply', async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      await peer!.addIceCandidate(candidate);
    });
  }
}

export function sendMessage(message: string) {
  socket?.emit('send-message', message, type, roomid);
}
