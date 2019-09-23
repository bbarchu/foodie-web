import { combineReducers } from "redux";
import activateReducer from "./activateReducer";


export default combineReducers({

  activateUser: activateReducer,
});
