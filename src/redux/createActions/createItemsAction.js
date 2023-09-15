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


export const createDir = (data) => (dispatch) => {
    initializeFirebase
        .firestore()
        .collection("directories")
        .add(data)
        .then(async (dir) => {    
            const dirData = await (await dir.get()).data()
            const dirId = dir.id
            dispatch(addDir({data: dirData, docId: dirId}))
            alert("Folder created successfully")
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
        alert("File created successfully")
    }).catch(() => {
        setFileCreatred(false)
    })
}