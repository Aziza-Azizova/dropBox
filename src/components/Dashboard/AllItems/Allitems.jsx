import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./AllItems.css"
import { faFileText, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { changeDPath } from "../../../redux/createActions/createItemsAction"

const AllItems = ({items, type}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = (itemId) => {
        if(type === "folder"){
            dispatch(changeDPath(itemId))
            navigate(`/dashboard/folder/${itemId}`)
        }else{
            navigate(`/dashboard/file/${itemId}`)
        }
    }

  return (
    <div>
        <div className="row gap-2 p-4 flex-wrap">
            {
                items.map((item, index) => {
                    return(
                        <p className="col-md-1 py-2 d-flex flex-column text-center" key={index * 55 } onDoubleClick={() => handleClick(item.docId)}>
                            {type === "folder" ? (
                                <FontAwesomeIcon icon={faFolderOpen} size="2x" color="#f8d775" className="mb-2"/>
                            ) : (
                                <FontAwesomeIcon icon={faFileText} size="2x" className="mb-2"/>
                            )}
                            {item.data.name}
                        </p>
                    )
                })
            }
        </div>
    </div>
  )
}

export default AllItems