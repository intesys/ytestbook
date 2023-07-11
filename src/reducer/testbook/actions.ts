import { LoginResponse } from "../../generated";

interface UserLoginLoading {
  type: "USER_LOGIN_LOADING";
}

interface UserLoginSuccess {
  type: "USER_LOGIN_SUCCESS";
  payload: LoginResponse;
}

interface UserLoginError {
  type: "USER_LOGIN_ERROR";
}

type TYTestbookAction = UserLoginLoading | UserLoginSuccess | UserLoginError;

export default TYTestbookAction;
