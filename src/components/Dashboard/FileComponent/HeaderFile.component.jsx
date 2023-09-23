import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updFileData } from "../../../redux/createActions/createItemsAction"

const HeaderFileComponent = ({fileName, fileId, fileData, fileDataprev}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <p className="navbar-brand fw-bold ms-5 my-0 d-flex">{fileName}
      {
        fileData !== fileDataprev && (
          <span className="fw-bold my-0 ms-1 text-danger">*</span>
        )
      }
      </p>     
      
      <ul className="navbar-nav ms-auto me-5">
        <li className="navbar-item mx-2">
          <button className="btn btn-success" disabled={fileData === fileDataprev} onClick={() => {dispatch(updFileData(fileId, fileData))}}><FontAwesomeIcon icon={faSave}/> Save</button>
        </li>
        <li className="navbar-item mx-2">
          <button className="btn btn-dark" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /> Go Back</button>
        </li>
      </ul> 
    </nav>
  )
}

export default HeaderFileComponent