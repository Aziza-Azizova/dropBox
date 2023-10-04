import * as types from "../typeOfAction/typeOfAction"
import initializeFirebase from "../../configures/firebase"
import { toast } from "react-toastify"

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
        toast.error("Invalid email or password")
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
            toast.info("This email already registered!")
        }
        if(err.code === "auth/invalid-email"){
            toast.error("Invalid Email!")
        }
        if(err.code === "auth/weak-password"){
            toast.warning("Weak Password!")
        }
    })
}

export const userSignOut = () => (dispatch) => {
    initializeFirebase.auth().signOut().then(() => {
        dispatch(userLogOut())
    })
}

export const isLoggedIn = (setLoading) => dispatch => {
    initializeFirebase.auth().onAuthStateChanged(user => {
        if(user){
            dispatch(userLogin({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            }))
        }
        setLoading(false);
    })
}