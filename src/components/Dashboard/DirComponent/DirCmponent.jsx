import { shallowEqual, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AllItems from "../AllItems/Allitems"

const DirCmponent = () => {
  const { dirId} = useParams()
  const {currentDirName, folderInDir, babyFiles} =useSelector(state => ({
    currentDirName: state.fileFolders.userFolder.find(dir => dir.docId === dirId)?.data,
    folderInDir: state.fileFolders.userFolder.filter(dir => dir.data.parent === dirId),
    babyFiles: state.fileFolders.userFiles.filter(doc => doc.data.parent === dirId)
  }), shallowEqual);

  const creatingFiles = babyFiles && babyFiles.filter((doc) => doc.data.url === null);
  const uploadingDocs = babyFiles && babyFiles.filter((doc) => doc.data.data === null);

  return (
    <div>
      {
        folderInDir.length > 0 || babyFiles.length > 0
          ? (
            <>
              {
                folderInDir.length > 0 && (
                  <AllItems title={"Created Folders"} type={"folder"} items={folderInDir}/>
                )
              }
              
              {creatingFiles && creatingFiles.length > 0 && (
                <AllItems title={"Created Files"} items={creatingFiles} type={"file"} />)
              }
              {uploadingDocs && uploadingDocs.length > 0 && (
                <AllItems title={"Uploaded Files"} items={uploadingDocs} type={"file"}/>
                )
              }
            </>
          ) 
          : (<p className="text-center my-2" style={{color: "gray"}}>Empty Folder</p>)
      }
    </div>
  )
}

export default DirCmponent