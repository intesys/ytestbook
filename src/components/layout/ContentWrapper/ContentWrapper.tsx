import { PropsWithChildren } from "react";
import classes from "./ContentWrapper.module.css";

export const ContentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.contentWrapper}>{children}</div>;
};
