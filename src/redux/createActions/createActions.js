import * as types from "../typeOfAction/typeOfAction"
import initializeFirebase from "../../configures/firebase"

const userLogin = (payload) => {
    return{
        type: types.SIGN_IN ,
        payload
    }
}

const userLogOut = () => {
    return{
        type: types.SIGN_OUT
    }
}


export const userSignIn = (email, password, setSuccess) => (dispatch) => {
    initializeFirebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        dispatch(userLogin({uid: user.user.uid, email: user.user.email, displayName: user.user.displayName}))
        setSuccess(true);
    }).catch(() => {
        alert("Invalid email or password")
    })
}

export const userSignUp = (name, email, password, setSuccess) => (dispatch) => {
    initializeFirebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        initializeFirebase.auth().currentUser.updateProfile({
            displayName: name
        }).then(() => {
            const currentUser = initializeFirebase.auth().currentUser;
            dispatch(userLogin({uid: currentUser.uid, name: currentUser.displayName, email: currentUser.email}))
            setSuccess(true);
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        if(err.code === "auth/email-already-in-use"){
            alert("This email already registered!")
        }
        if(err.code === "auth/invalid-email"){
            alert("Invalid Email!")
        }
        if(err.code === "auth/weak-password"){
            alert("Weak Password!")
        }
    })
}

export const userSignOut = () => (dispatch) => {
    initializeFirebase.auth().signOut().then(() => {
        dispatch(userLogOut())
    })
}

export const isLoggedIn = () => dispatch => {
    initializeFirebase.auth().onAuthStateChanged(user => {
        if(user){
            dispatch(userLogin({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            }))
        }
    })
}