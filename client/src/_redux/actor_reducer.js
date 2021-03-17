import { LOGIN_ACTOR, REGISTER_ACTOR, AUTH_ACTOR, LOGOUT_ACTOR } from "./types";

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_ACTOR:
      return { ...state, register: action.payload };
    case LOGIN_ACTOR:
      return { ...state, loginSucces: action.payload };
    case AUTH_ACTOR:
      return { ...state, actorData: action.payload };
    case LOGOUT_ACTOR:
      return { ...state };
    default:
      return state;
  }
}
