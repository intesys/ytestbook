import { TestModal } from "./testModal/TestModal";

export const modals = {
  testModal: TestModal,
  /* ...other modals */
};
declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
