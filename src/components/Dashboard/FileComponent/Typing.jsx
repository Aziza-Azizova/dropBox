import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./Typing.css"

const Typing = ({fileName, data, setData}) => {
  // const [data, setData] = useState("\n");
  const codes = {
    html: "xml",
    js: "javascript",
    jsx: "jsx",
    css: "css",
    py: "python",
    php: "php"
  }

  const handleKeyDown = (event) => {
    let value = content,
        selStartPos = event.currentTarget.selectionStart;
    console.log(event.currentTarget);

    if(event === "Tab"){
      value = value.substring(0, selStartPos) + "  " + value.substring(selStartPos, value.length);
      event.currentTarget.selectionStart = selStartPos + 3;
      event.currentTarget.selectionEnd = selStartPos + 4;
      event.preventDefault();

      setData(value);      
    }
  }

  return (
    <div className='row px-5 mt-3'>
      <div className='col-md-12 mx-auto txt-edit-container p-3'>
        <textarea className='txt-input w-100' value={data}  onChange={(e) => setData(e.target.value)} /> 
        <pre className='txt-output'>
          <SyntaxHighlighter language={codes[fileName.split(".")[1]]} showLineNumbers style={duotoneLight} wrapLines startingLineNumber={1}>{data}</SyntaxHighlighter>
        </pre>
      </div>
    </div>
  )
}

export default Typing