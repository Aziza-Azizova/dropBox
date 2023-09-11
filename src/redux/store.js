import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"

import authReducer from "./reducers/authReducer"
import itemsReducer from "./reducers/itemsReduser"


const store = createStore(
    combineReducers({auth: authReducer, fileFolders: itemsReducer}),
    composeWithDevTools(applyMiddleware(thunk))
)

export default store