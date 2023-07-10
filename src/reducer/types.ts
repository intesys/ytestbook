export interface IApiResponse<T> {
  status?: LOADING_STATUS;
  error?: any;
  data?: T;
}

export enum LOADING_STATUS {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}
