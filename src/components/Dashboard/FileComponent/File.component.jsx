import { shallowEqual, useSelector } from "react-redux";
import HeaderFileComponent from "./HeaderFile.component"
import { useParams } from "react-router-dom";
import Typing from "./Typing";
import { useEffect, useState } from "react";

const FileComponent = () => {
  const {fileId} = useParams()
  const [fileData, setFileData] = useState("")
  const [prevFData, setPrevFData] = useState("")

  const {currentFile} = useSelector((state) => ({
    currentFile: state.fileFolders.userFiles.find((f) => f.docId === fileId)
  }), shallowEqual);

  useEffect(() => {
    if(currentFile){
      setFileData(currentFile.data.data);
      setPrevFData(currentFile.data.data)
    }
  }, [currentFile, currentFile.data.data])

  return (
    <div>
      <HeaderFileComponent fileName={currentFile.data.name} fileId={fileId} fileData={fileData} fileDataprev={prevFData}/>
      <Typing fileName={currentFile.data.name} data={fileData} setData={setFileData}/>
    </div>
  )
}

export default FileComponent