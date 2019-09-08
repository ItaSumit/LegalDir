import { Signin } from "../redux/models/asignin";
import axiosRequest from "./axiosUtils";

const baseUrl = `${process.env.REACT_APP_BACK_END_URL}/users`;

export const signin = (signin: Signin) => (dispatch: any) => {
  console.log(`DETAIL: ${signin}`);
  return dispatch(
    axiosRequest(`${baseUrl}/login`, {
      method: "POST",
      body: JSON.stringify(signin)
    })
  );
};

export const signout = () => (dispatch: any) => {
  return dispatch(axiosRequest(`${baseUrl}/signout`, {}));
};
