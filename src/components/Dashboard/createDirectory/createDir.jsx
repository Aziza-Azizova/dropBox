import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { createDir } from '../../../redux/createActions/createItemsAction'
import { toast } from 'react-toastify'

const CreateDir = ({setNewDirModal}) => {
    const [folderName, setfolderName] = useState("")
    const {userFolder ,user, currentDir, currentDirInfo} = useSelector(state => ({
        userFolder: state.fileFolders.userFolder,
        user: state.auth.user,
        currentDir: state.fileFolders.currentDir,
        currentDirInfo: state.fileFolders.userFolder.find(dir => dir.docId === state.fileFolders.currentDir)
    }), shallowEqual)

    const dispatch = useDispatch()

    const isFolderPresent = (name) => {
        const yesPresent = userFolder
            .filter(dir => dir.data.parent === currentDir)
            .find(dir => dir.data.name === name);
        yesPresent ? true : false 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(folderName){
            if(folderName.length >= 3){
                if(!isFolderPresent(folderName)){
                    const data = {
                        createdAt: new Date(),
                        name:  folderName,
                        userId: user.uid,
                        createdBy: user.displayName,
                        path: currentDir === "root" ? [] : [...currentDirInfo?.data.path, currentDir],
                        parent: currentDir,
                        lastAccessed: null,
                        updatedAt: new Date()
                    }
                    dispatch(createDir(data))
                } else {
                    toast.warning("Folder with this name already present")
                }
            } else{
                toast.error(`Folder name should be at least 3 characters`)
            }
        } else{
            toast.error(`Folder name cannot be empty`)
        }
    }

    return (
    <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100" style={{background: "rgba(0, 0, 0, 0.4)", zIndex: 9999}}>
        <div className="row align-items-center justify-content-center">
            <div className="col-md-4 mt-5 bg-white rounded p-4">
                <div className="d-flex justify-content-between">
                    <h4>Create Folder</h4>
                    <button className="btn" onClick={() => setNewDirModal(false)}>
                        <FontAwesomeIcon icon={faTimes} className="text-black" size="sm"/>
                    </button>
                </div>
                <hr/>
                <div className="d-flex flex-column align-items-center">
                    <form className="mt-3 w-100" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="folderName" value={folderName} placeholder="FolderName" onChange={e => setfolderName(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-5 form-control">Create Folder</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CreateDir