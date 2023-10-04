import { shallowEqual, useSelector } from "react-redux";
import HeaderFileComponent from "./HeaderFile.component"
import { useNavigate, useParams } from "react-router-dom";
import Typing from "./Typing";
import { createElement, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const FileComponent = () => {
  const {fileId} = useParams()
  const [fileData, setFileData] = useState("")
  const [prevFData, setPrevFData] = useState("")

  const navigate = useNavigate();

  const {currentFile, isAuthenticated} = useSelector((state) => ({
    currentFile: state.fileFolders.userFiles.find((f) => f.docId === fileId),
    isAuthenticated: state.auth.isAuthenticated
  }), shallowEqual);

  useEffect(() =>{
    if(!isAuthenticated){
      navigate("/")
    }
  }, [])

  useEffect(() => {
    if(currentFile){
      setFileData(currentFile?.data?.data);
      setPrevFData(currentFile?.data?.data)
    }
  }, [currentFile, currentFile?.data?.data])

  const download = () => {
    const docLink = document.createElement("a");
    docLink.setAttribute("href", currentFile.data.url) ;
    docLink.setAttribute("download", currentFile.data.name);
    docLink.setAttribute("target", "_blank");
    docLink.style.display = "none";
    document.body.appendChild(docLink)
    docLink.click();
    document.body.removeChild(docLink)
  }

  return (
    <div>
      {
        fileData !== null ? (
          <>
            <HeaderFileComponent fileName={currentFile?.data?.name} fileId={fileId} fileData={fileData} fileDataprev={prevFData}/>
            <Typing fileName={currentFile?.data?.name} data={fileData} setData={setFileData}/>
          </>
        ) : (
          <div className="position-fixed w-100 h-100 fw-bold left-0 top-0">
            <div className="d-flex justify-content-around bg-white align-items-center pt-3">
              <p title={currentFile.data.name.length > 30 ? (currentFile.data.name) : ""}>{currentFile.data.name.length > 30 ? currentFile.data.name.slice(0, 31) + "..." + currentFile.data.extensions : currentFile.data.name}</p>
              <div className="d-flex align-items-center">
                <button title="Go Back" className="btn btn-sm btn-outline-dark mx-1 mr-2 mb-2" onClick={() => navigate(-1)}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button title="Download" className="btn btn-sm btn-outline-dark mx-1 mr-2 mb-2" onClick={() => download()}>
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </div>
            </div>
            <div className="w-100 mt-4" style={{height: "700px"}}>
              {/* {console.log(currentFile.data.url)} */}
              {
                currentFile.data.extensions.includes("png")  ||
                currentFile.data.extensions.includes("jpg")  ||
                currentFile.data.extensions.includes("jpeg") ||
                currentFile.data.extensions.includes("gif") ? (
                  <img src={currentFile.data.url} alt={currentFile.data.name} className="image-fluid w-100 h-100" />
                ) : (
                  <div className="mx-5">
                    <span>Could not read document format</span>
                    <span style={{display: "none"}}>
                      {toast.info("Please, download for preview!")}
                    </span>
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