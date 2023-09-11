import { shallowEqual, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AllItems from "../AllItems/Allitems"

const DirCmponent = () => {
  const { dirId} = useParams()
  const {currentDirName, folderInDir} =useSelector(state => ({
    currentDirName: state.fileFolders.userFolder.find(dir => dir.docId === dirId)?.data,
    folderInDir: state.fileFolders.userFolder.filter(dir => dir.data.parent === dirId)
  }), shallowEqual)

  return (
    <div>
      {
        folderInDir.length > 0 
          ? (
            <>
             <AllItems title={"Created Folders"} type={"folder"} items={folderInDir}/>
            </>
          ) 
          : (<p className="text-center my-2" style={{color: "gray"}}>Empty Folder</p>)
      }
    </div>
  )
}

export default DirCmponent