import _ from "lodash";
import { TUseCasesData } from "../../reducer/usecases/types";

export const updateFieldsEditMode = (
  fields: TUseCasesData,
  values: TUseCasesData
): TUseCasesData => {
  return _.merge({}, fields, values);
};
