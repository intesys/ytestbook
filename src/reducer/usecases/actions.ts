import { IUseCasesAction, TUseCasesData } from "./types";

interface ActionError {
  error?: any;
}

interface SetUseCaseLoading {
  type: "USECASE_SET_LOADING";
}

interface SetUseCaseError extends ActionError {
  type: "USECASE_SET_ERROR";
}

interface SetUseCaseSuccess {
  type: "USECASE_SET_SUCCESS";
}

interface GetUseCaseLoading {
  type: "USECASE_GET_LOADING";
}

interface GetUseCaseError extends ActionError {
  type: "USECASE_GET_ERROR";
}

interface GetUseCaseSuccess {
  type: "USECASE_GET_SUCCESS";
  payload: TUseCasesData;
}

interface GetUseCasesLoading {
  type: "USECASES_GET_LOADING";
}

interface GetUseCasesError extends ActionError {
  type: "USECASES_GET_ERROR";
}

interface GetUseCasesSuccess {
  type: "USECASES_GET_SUCCESS";
  payload: Array<TUseCasesData>;
}

interface DeleteUseCaseLoading {
  type: "USECASE_DELETE_LOADING";
}

interface DeleteUseCaseError extends ActionError {
  type: "USECASE_DELETE_ERROR";
}

interface DeleteUseCaseSuccess {
  type: "USECASE_DELETE_SUCCESS";
}

interface ResetUseCase {
  type: "USECASE_RESET";
}

interface SetAction {
  type: "SET_ACTION";
  payload: IUseCasesAction;
}

type TUseCasesAction =
  | SetUseCaseLoading
  | SetUseCaseError
  | SetUseCaseSuccess
  | GetUseCaseLoading
  | GetUseCaseError
  | GetUseCaseSuccess
  | GetUseCasesLoading
  | GetUseCasesError
  | GetUseCasesSuccess
  | DeleteUseCaseLoading
  | DeleteUseCaseError
  | DeleteUseCaseSuccess
  | ResetUseCase
  | SetAction;

export default TUseCasesAction;
