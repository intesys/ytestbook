export interface IProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (value: string) => void;
}
