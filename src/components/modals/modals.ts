import { ModalProps } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import merge from "lodash/merge";
import { AddServerModal } from "./addServerModal/AddServerModal.tsx";
import { ChangeStatusModal } from "./changeStatusModal/ChangeStatusModal.tsx";
import { CollaboratorModal } from "./collaboratorModal/CollaboratorModal.tsx";
import {
  ConfirmModal,
  TConfirmModalProps,
} from "./confirmModal/ConfirmModal.tsx";
import { CopyProjectToServer } from "./copyProjectToServer/CopyProjectToServer.tsx";
import { CreateTestbookModal } from "./createTestbookModal/CreateTestbookModal.tsx";
import { PromptModal } from "./promptModal/PromptModal.tsx";
import { ShareServerModal } from "./shareServerModal/ShareServerModal.tsx";
import { TestCaseModal } from "./testCaseModal/TestCaseModal.tsx";
import { TestModal } from "./testModal/TestModal.tsx";
import { InsertImageModal } from "./insertImageModal/InsertImageModal.tsx";
import { CloneProjectModal } from "./cloneProjectModal/CloneProjectModal.tsx";

export enum Modals {
  AddServerModal = "AddServerModal",
  ChangeStatusModal = "ChangeStatusModal",
  CollaboratorModal = "CollaboratorModal",
  ConfirmModal = "ConfirmModal",
  CopyProjectToServer = "CopyProjectToServer",
  CreateTestbookModal = "CreateTestbookModal",
  InsertImageModal = "InsertImageModal",
  PromptModal = "PromptModal",
  ShareServerModal = "ShareServerModal",
  TestCaseModal = "TestCaseModal",
  TestModal = "TestModal",
  CloneProjectModal = "CloneProjectModal",
}

export const modals = {
  [Modals.AddServerModal]: AddServerModal,
  [Modals.ChangeStatusModal]: ChangeStatusModal,
  [Modals.CollaboratorModal]: CollaboratorModal,
  [Modals.ConfirmModal]: ConfirmModal,
  [Modals.CopyProjectToServer]: CopyProjectToServer,
  [Modals.CreateTestbookModal]: CreateTestbookModal,
  [Modals.InsertImageModal]: InsertImageModal,
  [Modals.PromptModal]: PromptModal,
  [Modals.ShareServerModal]: ShareServerModal,
  [Modals.TestCaseModal]: TestCaseModal,
  [Modals.TestModal]: TestModal,
  [Modals.CloneProjectModal]: CloneProjectModal,
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
