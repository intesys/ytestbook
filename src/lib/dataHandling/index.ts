import _ from "lodash";
import { TFormFields } from "./types";

export const updateFieldsEditMode = (
  fields: TFormFields,
  values: TFormFields
): TFormFields => {
  return _.merge({}, fields, values);
};
