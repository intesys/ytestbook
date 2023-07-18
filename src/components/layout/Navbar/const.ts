import { createMachine } from "xstate";

export enum NAVBAR_STATUS_ENUM {
  collapsed = "collapsed",
  open = "open",
  full = "full",
}

export const navbarConfig = {
  [NAVBAR_STATUS_ENUM.collapsed]: 90,
  [NAVBAR_STATUS_ENUM.open]: 360,
  [NAVBAR_STATUS_ENUM.full]: "95vw",
};

export const toggleMachine = createMachine({
  id: "navbar_toggle",
  initial: NAVBAR_STATUS_ENUM.full,
  states: {
    [NAVBAR_STATUS_ENUM.collapsed]: {
      on: { NEXT: NAVBAR_STATUS_ENUM.open, FULL: NAVBAR_STATUS_ENUM.full },
    },
    [NAVBAR_STATUS_ENUM.open]: {
      on: { PREV: NAVBAR_STATUS_ENUM.collapsed, NEXT: NAVBAR_STATUS_ENUM.full },
    },
    [NAVBAR_STATUS_ENUM.full]: {
      on: {
        PREV: NAVBAR_STATUS_ENUM.open,
        RESET: NAVBAR_STATUS_ENUM.collapsed,
      },
    },
  },
});
