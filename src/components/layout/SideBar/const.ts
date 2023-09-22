
export enum SIDEBAR_STATUS {
  COLLAPSED = "collapsed",
  OPEN = "open",
  FULLSCREEN = "full",
}

export const navbarConfig = {
  [SIDEBAR_STATUS.COLLAPSED]: 90,
  [SIDEBAR_STATUS.OPEN]: 360,
  [SIDEBAR_STATUS.FULLSCREEN]: "95vw",
};
