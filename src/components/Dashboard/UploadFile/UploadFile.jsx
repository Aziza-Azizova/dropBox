import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { uploadDoc } from '../../../redux/createActions/createItemsAction'
import { toast } from 'react-toastify'

const UploadFile = ({setUploadFileMO}) => {
    const [doc, setDoc] = useState(null)
    const [fileCreated, setFileCreatred] = useState(false)

    const {userFiles ,user, currentDir, currentDirInfo} = useSelector((state) => ({
        userFiles: state.fileFolders.userFiles,
        user: state.auth.user,
        currentDir: state.fileFolders.currentDir,
        currentDirInfo: state.fileFolders.userFolder.find(dir => dir.docId === state.fileFolders.currentDir)
    }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        if(fileCreated){
            setDoc("")
            setFileCreatred(false)
            setUploadFileMO(false)
        }
    }, [fileCreated])

    const isFilePresent = (name) => {
        const yesPresent = userFiles
            .filter((f) => f.data.parent === currentDir)
            .find((d) => d.data.name === name);
        if(yesPresent){
            return true
        } else {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(doc){
            if(!isFilePresent(doc.name)){
                const data = {
                    createdAt: new Date(),
                    name: doc.name,
                    userId: user.uid,
                    createdBy: user.displayName,
                    path: currentDir === "root" ? [] : [...currentDirInfo?.data.path, currentDir],
                    parent: currentDir,
                    lastAccessed: null,
                    updatedAt: new Date(),
                    extensions: doc.name.split(".")[1],
                    data: null,
                    url: ""
                }
                dispatch(uploadDoc(doc, data, setFileCreatred))
            } else {
                toast.warning("File with this name already present")
            }
        } else{
            toast.error(`File name cannot be empty, please enter the file name!`)
        }
    }

    return (
    <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100" style={{background: "rgba(0, 0, 0, 0.4)", zIndex: 9999}}>
        <div className="row align-items-center justify-content-center">
            <div className="col-md-4 mt-5 bg-white rounded p-4">
                <div className="d-flex justify-content-between">
                    <h4>Upload File</h4>
                    <button className="btn" onClick={() => setUploadFileMO(false)}>
                        <FontAwesomeIcon icon={faTimes} className="text-black" size="sm"/>
                    </button>
                </div>
                <hr/>
                <div className="d-flex flex-column align-items-center">
                    <form className="mt-3 w-100" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="file" className="form-control" id="file" onChange={(e) => setDoc(e.target.files[0])} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-5 form-control">Upload File</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default UploadFile;