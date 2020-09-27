import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { addCustomer } from "./customersSlice";
import { FormControl } from "../../components/FormControl";
import * as Yup from "yup";
import { Button } from "../../components/Button";
import fStyle from "../../components/FormControl.module.scss";
import styles from "./Customer.module.scss";

const mapDispatch = { addCustomer };

const CustomerForm = ({ addCustomer }) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        dateOfBirth: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        addCustomer(values);
        setSubmitting(false);
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        dateOfBirth: Yup.date().required("Birthday is required"),
      })}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="addCustomerForm">
          <legend>Add Customer</legend>
          <div className={styles.CustomerRow}>
            <div className={styles.CustomerCol}>
              <FormControl
                label="First Name"
                type="firstName"
                name="firstName"
                id="firstName"
                placeholder=""
                isRequired={true}
              />
            </div>
            <div className={styles.CustomerCol}>
              <FormControl
                label="Last Name"
                type="lastName"
                name="lastName"
                id="lastName"
                placeholder=""
                isRequired={true}
              />
            </div>
            <div className={styles.CustomerCol}>
              <FormControl
                label="Birthday"
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                isRequired={true}
              />
            </div>
            <div className={styles.CustomerCol}>
              <div className={fStyle.FormControl}>
                <Button
                  data-testid="addButton"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default connect(null, mapDispatch)(CustomerForm);
