export enum ENTITIES_ACTIONS {
  IDLE,
  VIEW,
  NEW,
  EDIT,
  DELETE,
}

export enum LOADING_STATUS {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
  RELOAD,
}

export enum OPERATIONS_ACTIONS {
  IDLE,
  SET,
  GET,
  DELETE,
}

export interface IConfigBase {
  testBookTitle: string;
  testBookDesc: string;
  testBookVersion: string;
}
