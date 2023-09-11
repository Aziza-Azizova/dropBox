import * as types from "../typeOfAction/typeOfItemsAction"

const initialState = {
    isLoading: true,
    currentDir: "root",
    userFolder: [],
    userFiles: []
}

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {  
        case types.CREATE_FOLDER :
            return {
                ...state,
                userFolder: [...state.userFolder, action.payload]
            }
        case types.ADD_DIRECTORY:
            return {
                ...state,
                userFolder: action.payload
            }
        case types.LOADING:
            return{
                ...state,
                isLoading: action.payload
            }
        case types.CHANGE_DIR_PATH:
            return {
                ...state,
                currentDir: action.payload
            }
        case types.CREATE_FILE:
            return {
                ...state,
                userFiles: [...state.userFiles, action.payload]
            }
        case types.ADD_FILE:
            return {
                ...state,
                userFiles: action.payload
            }

        default:
            return state;
    }
}

export default itemsReducer;