import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [html, setHtml] = useLocalStorage("html",'');
  const [css, setCss] = useLocalStorage("css",'');
  const [js, setJs] = useLocalStorage("js",'');
  const [srcDoc, setSrcDoc] = useState("");

  //anytime our html,css,js changes ,we'll create a timeout.
  //only after that timeout we'll create the srcDoc i.e. we'll render the output of the html,css,js code.

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `
  <html>
  <body>${html}</body>
  <style>${css}</style>
  <script>${js}<script>
  </html>
  `
      );
    },250)
    return()=>clearTimeout(timeout)
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />

        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />

        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts" //helps with security.
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
