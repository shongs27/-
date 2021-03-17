import { combineReducers } from "redux";
import actor from "./actor_reducer";

const rootReducer = combineReducers({
  actor,
});

export default rootReducer;
