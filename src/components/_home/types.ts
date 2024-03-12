export type TActionProps = {
  title: string;
  label: string;
  icon: string;
  action: () => void;
};

export type TCreateTestbookModalProps = {
  opened: boolean;
  close: () => void;
};
