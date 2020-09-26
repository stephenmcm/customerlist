import React from "react";
import styles from "./Button.module.scss";

export const Button = ({ children, ...props }) => (
  <button
    className={
      props.className
        ? `${styles.Button} ${props.className}`
        : `${styles.Button}`
    }
    {...props}
  >
    {children}
  </button>
);
