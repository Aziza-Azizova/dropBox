import { faArrowDown, faArrowDownUpAcrossLine, faArrowUpFromBracket, faCloudArrowDown, faFileCirclePlus, faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import "./MainDashboardPage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { changeDPath } from "../../../redux/createActions/createItemsAction"

const MainDashboardPage = ({setNewDirModal, setNewFileM, setUploadFileMO}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {currentDir, currentDirInfo, userFolder} = useSelector(state => ({
        userFolder: state.fileFolders.userFolder,
        currentDir: state.fileFolders.currentDir,
        currentDirInfo: state.fileFolders.userFolder.find(dir => dir.docId === state.fileFolders.currentDir)
    }), shallowEqual)

    const handleClick = (link, id) => {
        navigate(link)

        dispatch(changeDPath(id))
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-light mt-2 px-5 miniNav">
        {currentDir !== "root" ? (
            <>
                {currentDirInfo?.data.path.length === 0 ? (
                    <>
                        <button className="btn text-decoration-none" onClick={() => handleClick("/dashboard", "root")}>
                            &lt; Back to All Documents
                        </button>
                    </>
                ) : (
                    <>
                        {currentDirInfo?.data.path.map((dir, indx) => (
                            <button key={indx} className="btn text-decoration-none" onClick={() => handleClick(`/dashboard/folder/${userFolder.find(f => dir === f.docId).docId}`, userFolder.find(f => dir === f.docId).docId)}>
                                &lt; Back
                            </button>
                        ))
                        }
                    </>
                )}
            </>
            ) : (
                <p className="nav" style={{fontWeight: "500"}}>All Documents</p>
            )
        }
        
        <ul className="navbar-nav gap-2" style={{margin: "0 auto"}}>
            <li className="nav-item">
                <button title="Upload File" className="btn btn-outline-dark" onClick={() => setUploadFileMO(true)} style={{padding: "5px 100px", marginRight:"35px"}}> Upload file <FontAwesomeIcon icon={faCloudArrowDown} style={{color: "8e7dd4", padding: "0 10px"}} /></button>
            </li>
            <li className="nav-item">
                <button title="Create File" className="btn btn-outline-dark" onClick={() => setNewFileM(true)} style={{padding: "5px 100px", marginRight:"35px"}}>Create File<FontAwesomeIcon icon={faFileCirclePlus} style={{color: "#8e7dd4", padding: "0 10px"}} /></button>
            </li>
            <li className="nav-item">
                <button title="Create Folder" className="btn btn-outline-dark" onClick={() => setNewDirModal(true)} style={{padding: "5px 100px"}}>Create Folder<FontAwesomeIcon icon={faFolderPlus} style={{color: "#8e7dd4", padding: "0 10px"}} /></button>
            </li>
        </ul>
    </nav>
  )
}

export default MainDashboardPage