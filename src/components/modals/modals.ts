import { CollaboratorModal } from "./collaboratorModal/CollaboratorModal.tsx";
import { TestModal } from "./testModal/TestModal.tsx";

export enum Modals {
  CollaboratorModal = "CollaboratorModal",
  TestModal = "TestModal",
}

export const modals = {
  [Modals.CollaboratorModal]: CollaboratorModal,
  [Modals.TestModal]: TestModal,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
