import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { makeFile } from '../../../redux/createActions/createItemsAction'
import { toast } from 'react-toastify'

const CreateFile = ({setNewFileMO}) => {
    const [fileName, setfileName] = useState("")
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
            setfileName("")
            setFileCreatred(false)
            setNewFileMO(false)
        }
    }, [fileCreated])

    const isFilePresent = (name, txt) => {
        if(!txt){
            name = name + ".txt"
        }
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
        if(fileName){
            if(fileName.length >= 3){
                let txt = false;
                if(fileName.split(".").length > 1){
                    txt = true
                }
                if(!isFilePresent(fileName, txt)){
                    const data = {
                        createdAt: new Date(),
                        name: txt ? fileName : `${fileName}.txt`,
                        userId: user.uid,
                        createdBy: user.displayName,
                        path: currentDir === "root" ? [] : [...currentDirInfo?.data.path, currentDir],
                        parent: currentDir,
                        lastAccessed: null,
                        updatedAt: new Date(),
                        extensions: txt ? fileName.split(".")[1] : "txt",
                        data: "",
                        url: null
                    }
                    dispatch(makeFile(data, setFileCreatred))
                } else {
                    toast.warning("File with this name already present")
                }
            } else{
                toast.error(`File name should be at least 3 characters`)
            }
        } else{
            toast.error(`File name cannot be empty`)
        }
    }

    return (
    <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100" style={{background: "rgba(0, 0, 0, 0.4)", zIndex: 9999}}>
        <div className="row align-items-center justify-content-center">
            <div className="col-md-4 mt-5 bg-white rounded p-4">
                <div className="d-flex justify-content-between">
                    <h4>Create File</h4>
                    <button className="btn" onClick={() => setNewFileMO(false)}>
                        <FontAwesomeIcon icon={faTimes} className="text-black" size="sm"/>
                    </button>
                </div>
                <hr/>
                <div className="d-flex flex-column align-items-center">
                    <form className="mt-3 w-100" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="fileName" value={fileName} placeholder="File Name, e.g.: index.txt, index.html" onChange={(e) => setfileName(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-5 form-control">Create File</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CreateFile