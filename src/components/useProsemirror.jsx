import { useState, useEffect } from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";
import { useRef } from "react";

export const useProsemirror = ({
  initialContent = `<p>Hi there!</p><h1>testing editor component</h1>`,
  // schema,
  plugins,
}) => {
  const editorRef = useRef(null);
  const [editorView, setEditorView] = useState(null);

  useEffect(() => {
    const editorNode = editorRef.current;

    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks,
    });

    const div = document.createElement("div");
    div.innerHTML = initialContent;
    const doc = DOMParser.fromSchema(mySchema).parse(div);

    const view = new EditorView(editorNode, {
      state: EditorState.create({
        doc,
        plugins: exampleSetup({ schema: mySchema }).concat(plugins),
      }),
    });

    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, []);

  return [editorView, editorRef];
};
