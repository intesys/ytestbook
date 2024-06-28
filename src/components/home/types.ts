export type TActionProps = {
  title?: string;
  label: string;
  icon: string;
  action: () => void;
};

export type TModalProps<T> = {
  projectId?: string;
  id?: string;
  initialValues?: Required<T>;
  handleSubmit: (values: T, id?: string) => void;
};
