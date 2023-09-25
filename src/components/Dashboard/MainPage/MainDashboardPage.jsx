import { faArrowUpFromBracket, faFileCirclePlus, faFolderPlus } from "@fortawesome/free-solid-svg-icons"
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
    <nav className="navbar navbar-expand-lg navbar-light mt-2 bg-white px-5">
        {currentDir !== "root" ? (
            <>
                {currentDirInfo?.data.path.length === 0 ? (
                    <>
                        <button className="btn btn-link text-decoration-none" onClick={() => handleClick("/dashboard", "root")}>
                            &lt; Back to All Documents
                        </button>
                    </>
                ) : (
                    <>
                        {currentDirInfo?.data.path.map((dir, indx) => (
                            <button key={indx} className="btn btn-link text-decoration-none" onClick={() => handleClick(`/dashboard/folder/${userFolder.find(f => dir === f.docId).docId}`, userFolder.find(f => dir === f.docId).docId)}>
                                &lt; Back
                            </button>
                        ))
                        }
                    </>
                )}
            </>
            ) : (
                <p>All Documents</p>
            )
        }
        
        <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2">
                <button title="Upload File" className="btn btn-outline-dark" onClick={() => setUploadFileMO(true)}> <FontAwesomeIcon icon={faArrowUpFromBracket} style={{color: "8e7dd4"}} /></button>
            </li>
            <li className="nav-item mx-2">
                <button title="Create File" className="btn btn-outline-dark" onClick={() => setNewFileM(true)}><FontAwesomeIcon icon={faFileCirclePlus} style={{color: "#8e7dd4",}} /></button>
            </li>
            <li className="nav-item ms-2">
                <button title="Create Folder" className="btn btn-outline-dark" onClick={() => setNewDirModal(true)}><FontAwesomeIcon icon={faFolderPlus} style={{color: "#8e7dd4",}} /></button>
            </li>
        </ul>
    </nav>
  )
}

export default MainDashboardPage