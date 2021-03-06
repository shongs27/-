import axios from "axios";
import {
  LOGIN_ACTOR,
  REGISTER_ACTOR,
  LOGOUT_ACTOR,
  AUTH_ACTOR,
} from "../_redux/types";
import { ACTOR_SERVER } from "../../src/config";

export const registerActor = (data) => {
  const request = axios
    .post(`${ACTOR_SERVER}/register`, data)
    .then((res) => res.data);

  return {
    type: REGISTER_ACTOR,
    payload: request,
  };
};

export const loginActor = (data) => {
  const request = axios
    .post(`${ACTOR_SERVER}/login`, data)
    .then((res) => res.data);

  return {
    type: LOGIN_ACTOR,
    payload: request,
  };
};

export const auth = () => {
  const request = axios.get(`${ACTOR_SERVER}/auth`).then((res) => res.data);

  return {
    type: AUTH_ACTOR,
    payload: request,
  };
};

export function logoutActor() {
  const request = axios
    .get(`${ACTOR_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_ACTOR,
    payload: request,
  };
}
