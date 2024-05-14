import React, { useEffect, useRef } from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { schema } from "prosemirror-schema-basic";
import "prosemirror-view/style/prosemirror.css";

const ProseMirrorEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Create a ProseMirror editor instance
    const editorNode = editorRef.current;
    const state = EditorState.create({ schema });
    const view = new EditorView(editorNode, { state });

    // Cleanup when component unmounts
    return () => {
      view.destroy();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return <div ref={editorRef} />;
};

export default ProseMirrorEditor;
