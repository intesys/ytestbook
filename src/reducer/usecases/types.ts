import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../types";

export type TUseCasesData = {
  id: string;
  title: string;
  preview?: string;
  description?: string;
  requirements?: string;
  accountantId?: string;
  responsibleId?: Array<string>;
  startDate?: string;
  endDate?: string;
  tags?: Array<string>;
};

export interface IUseCasesAction {
  type: ENTITIES_ACTIONS;
  id?: string;
}

export interface IUseCasesStatus {
  items?: Array<TUseCasesData>;
  status: LOADING_STATUS;
  operation: OPERATIONS_ACTIONS;
}

export interface IUseCaseStatus {
  item?: TUseCasesData;
  status: LOADING_STATUS;
  operation: OPERATIONS_ACTIONS;
}

export interface IUseCasesState {
  usecase: IUseCaseStatus;
  usecases: IUseCasesStatus;
  action: IUseCasesAction;
}
