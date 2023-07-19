import { TInputVariant } from "../../../types";

export interface IProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  variant?: TInputVariant;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (value: string) => void;
}
