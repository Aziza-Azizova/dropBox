import { toast } from "react-toastify"
import initializeFirebase from "../../configures/firebase"
import * as types from "../typeOfAction/typeOfItemsAction"

const addDir = (payload) => ({
    type: types.CREATE_FOLDER,
    payload
})

const addAllDirs = (payload) => ({
    type: types.ADD_DIRECTORY,
    payload
})

const loading = (payload) => ({
    type: types.LOADING,
    payload
})

const changeDirPath = (payload) => ({
    type: types.CHANGE_DIR_PATH,
    payload
})

const createFile = (payload) => ({
    type: types.CREATE_FILE,
    payload
})  

const addAllFiles = (payload) => ({
    type: types.ADD_FILE,
    payload
})

const fileData = (payload) => ({
    type: types.FILE_DATA,
    payload
})

export const createDir = (data) => (dispatch) => {
    initializeFirebase
        .firestore()
        .collection("directories")
        .add(data)
        .then(async (dir) => {    
            const dirData = await (await dir.get()).data()
            const dirId = dir.id
            dispatch(addDir({data: dirData, docId: dirId}))
            toast.success("Folder created successfully")
        })
}


export const getAllDirs = (userId) => (dispatch) => {
    dispatch(loading(true))
    initializeFirebase
        .firestore()
        .collection("directories")
        .where("userId", "==", userId)
        .get()
        .then(async (dirs) => {
            const dirsData = await dirs.docs.map((dir) => ({
                data: dir.data(),
                docId: dir.id
            }))
            dispatch(addAllDirs(dirsData))
            dispatch(loading(false))
        })
}


export const changeDPath = (dirId) => (dispatch) => {
    dispatch(changeDirPath(dirId))
}


export const getAllFiles = (userId) => (dispatch) => {
    initializeFirebase
        .firestore()
        .collection("docs")
        .where("userId", "==", userId)
        .get()
        .then(async (f) => {
            const docsData = await f.docs.map((doc) => ({
                data: doc.data(),
                docId: doc.id
            }))
            dispatch(addAllFiles(docsData))
        })
}   

export const makeFile = (data) => (dispatch, setFileCreatred) => {
    initializeFirebase.firestore().collection("docs").add(data).then(async (doc) => {
        const docData = await (await doc.get()).data();
        const docId = doc.id;
        dispatch(createFile({data: docData, docId: docId}))
        setFileCreatred(true)
        toast.success("File created successfully")
    }).catch(() => {
        setFileCreatred(false)
    })
}


export const updFileData = (fileId, data) => (dispatch) => {
    initializeFirebase.firestore().collection("docs").doc(fileId).update({data}).then(() => {
        dispatch(fileData({fileId, data}));
        toast.success("File updated successfully!")
        }).catch(() => {
            toast.error("Sorry, but something went wrong!")
        })
}

export const uploadDoc = (file, data, setUploaded) => (dispatch) => {
    // console.log(data);
    // const metadata = {
    //     contentType: `image/${data.extensions}`,
    // };
    const uploadDocRef = initializeFirebase.storage().ref(`docs/${data.userId}/${data.name}.${data.extensions}`);
    uploadDocRef.put(file).on("state_changed", (snapshot) => {
        const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if(isNaN(prog)){
        console.log("uploading...");
        }else{
            console.log(`uploading ${prog}%`);
        }
    },
    (err) => {
        console.log(err);
    },
    async () => {
        const docData = await uploadDocRef.getDownloadURL();
        console.log(docData);
        const allData = {...data, url: docData};
        initializeFirebase.firestore().collection("docs").add(allData).then(async (file) => {
            toast.success("File uploaded successfully");
            const docDatas = await (await file.get()).data();
            const  docId = file.id;
            dispatch(createFile({data: docDatas, docId: docId}))
            setUploaded(true)
        }).catch(() => {
            setUploaded(false)
        })
    })
}