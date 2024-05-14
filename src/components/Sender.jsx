import { useProsemirror } from "./useProsemirror";
// import ProseMirrorEditor from "./components/ProsemirrorEditor1";
import { useCallback, useContext, useEffect, useState } from "react";
import { PeerConnection } from "../helpers/peer";

export const Sender = () => {
  const [editorView, editorRef] = useProsemirror({
    plugins: [],
  });
  const [inputState, setInputSet] = useState("")


  const handleOnClick = useCallback(async () => {
    await PeerConnection.connectPeer(inputState)
    // navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
    //   const peerObj = PeerConnection.getPeer();
    //   peerObj.call(inputState, stream);
    // });

    // navigator.mediaDevices
    //   .getDisplayMedia({ video: { mediaSource: 'screen' }, audio: true })
    //   .then((stream) => {
    //     console.log("source", stream.getTracks())
    //     const peerObj = PeerConnection.getPeer();
    //     peerObj.call(inputState, stream);
    //   });
    //   =====================================
    const audioStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: 'screen' } })
    const combinedStream = new MediaStream([...audioStream.getTracks(), ...screenStream.getTracks()])
    const peerObj = PeerConnection.getPeer();
    peerObj.call(inputState, combinedStream);

  }, [inputState])

  useEffect(() => {
    const startPeerSession = async () => {
      const id = PeerConnection.startPeerSession()

      PeerConnection.onIncomingConnection((conn) => {
        const peerId = conn.peer
        PeerConnection.onConnectionDisconnected(peerId, () => { })
      })

    }

    startPeerSession()

    return () => {
      PeerConnection.closePeerSession()
    }
  }, [])

  return (
    <div>
      <input type="text" placeholder="enter peerId" onChange={(e) => setInputSet(e.target.value)} />
      <button onClick={handleOnClick}>Connect</button>
      <div ref={editorRef}></div>
    </div>
  )
}

