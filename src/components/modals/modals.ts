import { CollaboratorModal } from "./collaboratorModal/CollaboratorModal.tsx";
import { ConfirmModal } from "./confirmModal/ConfirmModal.tsx";
import { CreateTestbookModal } from "./createTestbookModal/CreateTestbookModal.tsx";
import { TestCaseModal } from "./testCaseModal/TestCaseModal.tsx";
import { TestModal } from "./testModal/TestModal.tsx";

export enum Modals {
  CollaboratorModal = "CollaboratorModal",
  ConfirmModal = "ConfirmModal",
  CreateTestbookModal = "CreateTestbookModal",
  TestCaseModal = "TestCaseModal",
  TestModal = "TestModal",
}

export const modals = {
  [Modals.CollaboratorModal]: CollaboratorModal,
  [Modals.ConfirmModal]: ConfirmModal,
  [Modals.CreateTestbookModal]: CreateTestbookModal,
  [Modals.TestCaseModal]: TestCaseModal,
  [Modals.TestModal]: TestModal,
};

export const deleteModalsDefaults = {
  modal: Modals.ConfirmModal,
  centered: true,
  innerProps: {
    confirmButtonLabel: "Yes, delete it",
    confirmButtonProps: {
      variant: "filled",
      color: "red",
    },
    cancelButtonProps: {
      variant: "subtle",
      color: "gray",
    },
  },
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
