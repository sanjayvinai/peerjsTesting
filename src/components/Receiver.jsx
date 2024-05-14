import { useEffect, useRef, useState } from "react"
import { PeerConnection } from "../helpers/peer"

export const Receiver = () => {
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const [peer, setPeer] = useState(null)

  useEffect(() => {
    let id = null
    const startPeerSession = async () => {
      id = await PeerConnection.startPeerSession()
      console.log("id", id)
      setPeer(id)

      PeerConnection.onIncomingConnection((conn) => {
        const peerId = conn.peer
        PeerConnection.getPeer().on('call', (call) => {
          console.log("gotCall")
          call.answer();
          call.on('stream', (stream) => {
            console.log("inputStream", stream.getAudioTracks(), stream.getVideoTracks(), stream.getTracks())
            if (stream.getVideoTracks().length > 0) {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
            }
            if (stream.getAudioTracks().length > 0) {
              console.log("audioRef", audioRef)
              audioRef.current.srcObject = stream;
              audioRef.current.autoPlay();
              audioRef.current.controls = true;
            }
          });
        });
        PeerConnection.onConnectionDisconnected(peerId, () => { })
      })
    }

    startPeerSession()

    setPeer(id)

    return () => {
      PeerConnection.closePeerSession()
    }
  }, [])

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(peer)
  //   }, 1000)
  //
  // }, [peer])
  return (
    <div>
      <div>your peerId:{peer ? peer : "None"}</div>

      <video style={{ width: "100%", height: "100vh" }} ref={videoRef}></video>
      {/* <audio style={{ visibility: "hidden", position: "absolute" }} ref={audioRef}></audio> */}
    </div>
  )
}

