export type TActionProps = {
  title: string;
  label: string;
  icon: string;
  action: () => void;
};

export type TModalProps = {
  opened: boolean;
  close: () => void;
};
