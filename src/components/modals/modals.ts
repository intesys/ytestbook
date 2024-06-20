import { CollaboratorModal } from "./collaboratorModal/CollaboratorModal.tsx";
import { ConfirmModal } from "./confirmModal/ConfirmModal.tsx";
import { TestModal } from "./testModal/TestModal.tsx";

export enum Modals {
  CollaboratorModal = "CollaboratorModal",
  ConfirmModal = "ConfirmModal",
  TestModal = "TestModal",
}

export const modals = {
  [Modals.CollaboratorModal]: CollaboratorModal,
  [Modals.ConfirmModal]: ConfirmModal,
  [Modals.TestModal]: TestModal,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
