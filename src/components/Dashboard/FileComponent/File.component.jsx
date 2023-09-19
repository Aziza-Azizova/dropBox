import { shallowEqual, useSelector } from "react-redux";
import HeaderFileComponent from "./HeaderFile.component"
import { useParams } from "react-router-dom";
import Typing from "./Typing";

const FileComponent = () => {
  const {fileId} = useParams()
  const {currentFile} = useSelector((state) => ({
    currentFile: state.fileFolders.userFiles.find((f) => f.docId === fileId)
  }), shallowEqual)

  return (
    <div>
      <HeaderFileComponent fileName={currentFile.data.name}/>
      <Typing fileName={currentFile.data.name}/>
    </div>
  )
}

export default FileComponent