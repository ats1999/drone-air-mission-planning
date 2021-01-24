import {combineReducers} from "redux";
import planReducer from "./plans";

export default combineReducers({
    plan:planReducer
});