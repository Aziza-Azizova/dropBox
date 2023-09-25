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


export const updFileData = (fileId, data) => (dispatch) => {
    initializeFirebase.firestore().collection("docs").doc(fileId).update({data}).then(() => {
        dispatch(fileData({fileId, data}));
        alert("File updated successfully!")
        }).catch(() => {
            alert("Sorry, but something went wrong!")
        })
}

export const uploadDoc = (file, data, setUploaded) => (dispatch) => {
    // console.log(data);
    // const metadata = {
    //     contentType: `image/${data.extensions}`,
    // };
    // const uploadDocRef = initializeFirebase.storage().ref(`docs/${data.userId}/${data.name}`);
    // uploadDocRef.put(file, metadata).on("state_changed", (snapshot) => {
    //     const prog = Math.round(
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     if(isNaN(prog)){
    //     console.log("uploading...");
    //     }else{
    //         console.log(`uploading ${prog}%`);
    //     }
    // },
    // (err) => {
    //     console.log(err);
    // },
    // async () => {
    //     const docData = await uploadDocRef.getDownloadURL();
    //     const allData = {...data, url: docData};
    //     initializeFirebase.firestore().collection("docs").add(allData).then(async (file) => {
    //         alert("File uploaded successfully");
    //         const docDatas = await (await file.get()).data();
    //         const  docId = file.id;
    //         dispatch(createFile({data: docDatas, docId: docId}))
    //         setUploaded(true)
    //     }).catch(() => {
    //         setUploaded(false)
    //     })
    // })


    const blob = async () => {
        await new promise((resolve, reject) => {
        const xhr = new xmlhttprequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new typeerror("network request failed"));
        };
        xhr.responsetype = "blob";
        xhr.open("get", image, true);
        xhr.send(null);
      });
      const ref = firebase
        .storage()
        .ref()
        .child(file);
        
      const task = ref.put(blob, { contenttype: `image/${data.extensions}` });
    
      task.on('state_changed', 
        (snapshot) => {
          console.log(snapshot.totalbytes)
        }, 
        (err) => {
          console.log(err)
        }, 
        () => {
          task.snapshot.ref.getdownloadurl().then((downloadurl) => {
            console.log(downloadurl);
        });
    })}
}




// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// export const uploadDoc = (file, data, setUploaded) => (dispatch) => {

//     const storage = getStorage();
//     const storageRef = ref(storage, `docs/${data.userId}/${data.name}`);

//     const metadata = {
//         contentType: 'image/png',
//         firebaseStorageDownloadTokens: uuidv4()
//       };

//     const uploadTask = uploadBytesResumable(storageRef, file, metadata);
//     uploadTask.on('state_changed', 
//     (snapshot) => {
//         switch (snapshot.state) {
//         case 'paused':
//             console.log('Upload is paused');
//             break;
//         case 'running':
//             console.log('Upload is running');
//             break;
//         }
//     }, 
//     (err) => {
//         console.log(err);
//     },
//     async () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             console.log('File available at', downloadURL);
//             const allData = {...data, url: downloadURL};
//         initializeFirebase.firestore().collection("docs").add(allData).then(async (file) => {
//             alert("File uploaded successfully");
//             const docDatas = await (await file.get()).data();
//             const  docId = file.id;
//             dispatch(createFile({data: docDatas, docId: docId}))
//             setUploaded(true)
//         }).catch(() => {
//             setUploaded(false)
//         })
//         })
//     } 
//     )
// }