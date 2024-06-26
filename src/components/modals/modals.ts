import { ModalProps } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import merge from "lodash/merge";
import { CollaboratorModal } from "./collaboratorModal/CollaboratorModal.tsx";
import {
  ConfirmModal,
  TConfirmModalProps,
} from "./confirmModal/ConfirmModal.tsx";
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

export const openDeleteConfirmModal = (
  title: string,
  innerProps: TConfirmModalProps = {},
  modalProps: Omit<ModalProps, "opened" | "onClose"> = {},
) =>
  openContextModal(
    merge(deleteModalsDefaults, {
      title,
      ...modalProps,
      innerProps,
    }),
  );

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
