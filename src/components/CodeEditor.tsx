"use client";

import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { scala } from "@codemirror/legacy-modes/mode/clike";
import { EditorView } from "@codemirror/view";

const scalaLanguage = StreamLanguage.define(scala);

const editorTheme = EditorView.theme({
  "&": { fontSize: "13.5px" },
  ".cm-content": { fontFamily: "var(--font-geist-mono, monospace)", padding: "12px 0" },
  ".cm-gutters": { backgroundColor: "transparent", border: "none" },
});

export function CodeEditor({
  value,
  onChange,
  readOnly = false,
  minHeight = "120px",
}: {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  minHeight?: string;
}) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={[scalaLanguage]}
      theme={editorTheme}
      readOnly={readOnly}
      basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: !readOnly }}
      style={{ minHeight, borderRadius: "6px", overflow: "hidden" }}
    />
  );
}
