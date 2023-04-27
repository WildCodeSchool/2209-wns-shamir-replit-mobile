import React, { createContext, useState, useMemo, ReactNode } from "react";

type EditorCodeContextProviderProps = { children: ReactNode };

type TypeContext = {
  editorCode: string;
  setEditorCode: (c: string) => void;
};

const EditorCodeContext = createContext<TypeContext>({
  editorCode: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEditorCode: () => {},
});

export function EditorCodeContextProvider({
  children,
}: EditorCodeContextProviderProps) {
  const [editorCode, setEditorCode] = useState<string>("");
  const value = useMemo(
    () => ({
      editorCode,
      setEditorCode,
    }),
    [editorCode]
  );
  return (
    <EditorCodeContext.Provider value={value}>
      {children}
    </EditorCodeContext.Provider>
  );
}

export default EditorCodeContext;
