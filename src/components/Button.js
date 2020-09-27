import React from "react";
import styles from "./Button.module.scss";

export const Button = ({ type, children, ...props }) => {
  let classNames = `${styles.Button}`;
  if (type === "danger") {
    classNames = `${classNames} ${styles.Danger}`;
  }
  if (props.className) {
    classNames = `${classNames} ${props.className}`;
  }
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};
