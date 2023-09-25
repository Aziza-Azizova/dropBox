import { shallowEqual, useSelector } from "react-redux";
import HeaderFileComponent from "./HeaderFile.component"
import { redirect, useNavigate, useParams } from "react-router-dom";
import Typing from "./Typing";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";

const FileComponent = () => {
  const {fileId} = useParams()
  const [fileData, setFileData] = useState("")
  const [prevFData, setPrevFData] = useState("")

  const navigate = useNavigate();

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
      {
        fileData !== null ? (
          <>
            <HeaderFileComponent fileName={currentFile.data.name} fileId={fileId} fileData={fileData} fileDataprev={prevFData}/>
            <Typing fileName={currentFile.data.name} data={fileData} setData={setFileData}/>
          </>
        ) : (
          <div className="position-fixed w-100 h-100 bg-black text-white left-0 top-0">
            <div className="d-flex justify-content-around align-items-center py-3">
              <p title={currentFile.data.name.length > 30 ? (currentFile.data.name) : ""}>{currentFile.data.name.length > 30 ? currentFile.data.name.slice(0, 31) + "..." + currentFile.data.extensions : currentFile.data.name}</p>
              <div className="d-flex align-items-center">
                <button title="Go Back" className="btn btn-sm btn-outline-light mx-1 mr-2" onClick={() => navigate(-1)}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button title="Download" className="btn btn-sm btn-outline-light mx-1 mr-2" onClick={() => navigate(-1)}>
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </div>
            </div>
            <div className="w-100 mt-4">
              {/* {console.log(currentFile.data.url)} */}
              {
                currentFile.data.extensions.includes("png")  ||
                currentFile.data.extensions.includes("jpg")  ||
                currentFile.data.extensions.includes("jpeg") ||
                currentFile.data.extensions.includes("gif") ? (
                  <img src={currentFile.data.url} alt={currentFile.data.name} className="w-100 h-100" />
                ) : (
                  <div>
                    hi:0000
                    {/* {redirect(currentFile.data.url)} */}
                  </div>
                )
              }
            </div>
          </div>
        )
      }
      
    </div>
  )
}

export default FileComponent