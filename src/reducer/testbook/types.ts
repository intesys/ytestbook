import { LoginResponse } from "../../generated";
import { IApiResponse } from "../types";

export interface IYTestbookState {
  auth: IApiResponse<LoginResponse>;
}
