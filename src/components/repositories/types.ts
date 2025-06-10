import { TUseProject } from "../../lib/operators/types";

export type TActionProps = {
  title?: string;
  label: string;
  icon: string;
  action: () => void;
};

export type TModalProps<T> = {
  project?: TUseProject;
  id?: string;
  initialValues?: Required<T>;
  handleSubmit: (values: T, id?: string) => void;
};
