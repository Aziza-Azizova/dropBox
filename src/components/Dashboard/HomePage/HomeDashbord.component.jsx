import { shallowEqual, useSelector } from "react-redux";
import AllItems from "../AllItems/Allitems";
import "./HomeDashbord.component.css"

const HomeDashbord = () => {
    const {isLoading, userFolder, userFiles} = useSelector(state => ({
        isLoading: state.fileFolders.isLoading,
        userFolder: state.fileFolders.userFolder.filter(dir => dir.data.parent === "root"),
        userFiles: state.fileFolders.userFiles.filter((file) => file.data.parent === "root")
    }), shallowEqual)
    return (
        <div className="col-md-12 w-100 bg-white homeDash">
            {
                isLoading ? (
                    <h1 className="display-6 my-5 text-center">Loading...</h1>
                ) : (
                    <>
                        <AllItems title={"Created Folders"} type={"folder"} items={userFolder}/>
                        <AllItems title={"Created Files"} type={"file"} items={
                            userFiles.filter(doc => doc.data.url === null)
                        }/>
                        <AllItems title={"Uploaded Files"} type={"file"} items={
                            userFiles.filter(doc => doc.data.data === null)
                        }/>
                    </>
                )
            }
            
        </div>
    )
}

export default HomeDashbord