
export enum NAVBAR_STATUS {
  COLLAPSED = "collapsed",
  OPEN = "open",
  FULLSCREEN = "full",
}

export const navbarConfig = {
  [NAVBAR_STATUS.COLLAPSED]: 90,
  [NAVBAR_STATUS.OPEN]: 360,
  [NAVBAR_STATUS.FULLSCREEN]: "95vw",
};
