export type TActionProps = {
  title: string;
  label: string;
  icon: string;
  action: () => void;
};

export type TModalProps<T> = {
  title: string;
  opened: boolean;
  close: () => void;
} & (
  | {
      id: string;
      initialValues: Required<T>;
      handleSubmit: (values: T, id: string) => void;
    }
  | {
      id?: undefined;
      initialValues?: undefined;
      handleSubmit: (values: T) => void;
    }
);
