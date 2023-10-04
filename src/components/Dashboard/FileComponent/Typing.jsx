import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneDark, duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./Typing.css"
import { useNavigate } from 'react-router-dom';
import { duotoneEarth } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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

  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    // let value = event.target.value;
    // console.log(event.target.value);
    console.log(event);
    // if(event == "Tab"){
    //   value = value.substring(0, selStartPos) + "   " + value.substring(selStartPos, value.length);
    //   event.currentTarget.selectionStart = selStartPos + 3;
    //   event.currentTarget.selectionEnd = selStartPos + 4;
    //   event.preventDefault();

    //   setData(value);      
    // }
    setData(event.target.value)
  }

  return (
    <div className='row px-5 mt-3'>
      <div className='col-md-12 mx-auto txt-edit-container'>
        <textarea className='txt-input w-100' value={data}  onChange={(e) => handleKeyDown(e)} /> 
        <pre className='txt-output'>
          <SyntaxHighlighter language={fileName? codes[fileName.split(".")[1]] : navigate(-1)} style={duotoneEarth} wrapLines showLineNumbers startingLineNumber={1}>{data}</SyntaxHighlighter>
        </pre>
      </div>
    </div>
  )
}

export default Typing