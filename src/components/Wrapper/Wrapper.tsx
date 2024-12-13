import React, { ReactNode } from "react";
import styles from "./Wrapper.module.scss";
const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className={styles['wrapper']}>{children}</div>;
};

export default Wrapper;
