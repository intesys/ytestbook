interface UserLoginLoading {
  type: "USER_LOGIN_LOADING";
}

interface UserLoginSuccess {
  type: "USER_LOGIN_SUCCESS";
}

interface UserLoginError {
  type: "USER_LOGIN_ERROR";
}

type TYTestbookAction = UserLoginLoading | UserLoginSuccess | UserLoginError;

export default TYTestbookAction;
