import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

const HeaderFileComponent = ({fileName}) => {
  const navigate = useNavigate()
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <p className="navbar-brand fw-bold ms-5 my-0">{fileName}</p>     

      <ul className="navbar-nav ms-auto me-5">
        <li className="navbar-item mx-2">
          <button className="btn btn-success" disabled={true}><FontAwesomeIcon icon={faSave}/> Save</button>
        </li>
        <li className="navbar-item mx-2">
          <button className="btn btn-dark" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /> Go Back</button>
        </li>
      </ul> 
    </nav>
  )
}

export default HeaderFileComponent