import { useField } from "formik";
import React from "react";
import styles from "./FormControl.module.scss";

export const FormControl = ({ label, helpText, isRequired, ...props }) => {
  const [field, meta] = useField(props);

  const [didFocus, setDidFocus] = React.useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (!!didFocus && field.value.trim().length > 4) || meta.touched;

  return (
    <div
      className={`${styles.FormControl} ${
        showFeedback ? (meta.error ? "invalid" : "valid") : ""
      }`}
    >
      <label htmlFor={props.id}>
        {label}{" "}
        {isRequired && (
          <>
            <i aria-hidden="true">*</i>
            <i className="visuallyHidden">required</i>
          </>
        )}
      </label>{" "}
      <input
        className={meta.error ? `${styles.Error}` : "valid"}
        data-testid={`input-${props.name}`}
        {...props}
        {...field}
        aria-describedby={`${props.id}-feedback`}
        aria-invalid={meta.error ? "true" : ""}
        onFocus={handleFocus}
      />
      {showFeedback && meta.error ? (
        <div
          id={`${props.id}-feedback`}
          aria-live="polite"
          className={`${styles.ErrText}`}
        >
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};
