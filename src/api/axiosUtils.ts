import axios from "axios";
import { AppError } from "../redux/models/appError";

export default function axiosRequest(url: string, options: any) {
  return (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: url,
          method: options.method,
          headers: {
            authorization: getState().signinState.token
              ? getState().signinState.token.token
              : "",
            "content-type": "application/json"
          },
          data: options.body ? JSON.parse(options.body) : {}
        })
        .then((res: any) => {
          console.log(res);
          return resolve(res.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    });
  };
}

// https://blog.logrocket.com/data-fetching-in-redux-apps-a-100-correct-approach-4d26e21750fc/
