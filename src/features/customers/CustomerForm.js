import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { addCustomer, editCustomer } from "./customersSlice";
import { FormControl } from "../../components/FormControl";
import * as Yup from "yup";
import { Button } from "../../components/Button";
import fStyle from "../../components/FormControl.module.scss";
import styles from "./Customer.module.scss";

const mapDispatch = { addCustomer, editCustomer };

const CustomerForm = ({
  addCustomer,
  editCustomer,
  customer,
  toggleShowForm,
}) => {
  const values = customer ?? {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  };

  return (
    <Formik
      initialValues={values}
      onSubmit={(values, { setSubmitting }) => {
        if (!customer) {
          addCustomer(values);
        }
        if (customer) {
          editCustomer({ id: customer.id, ...values });
        }
        setSubmitting(false);
        if (toggleShowForm) {
          toggleShowForm(false);
        }
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        dateOfBirth: Yup.date().required("Birthday is required"),
      })}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="addCustomerForm">
          <legend>{customer ? "Update" : "Add"} Customer</legend>
          <div className={styles.CustomerRow}>
            <div className={styles.CustomerCol}>
              <FormControl
                label="First Name"
                name="firstName"
                id="firstName"
                placeholder=""
                isRequired={true}
              />
            </div>
            <div className={styles.CustomerCol}>
              <FormControl
                label="Last Name"
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
                  {customer ? "Update" : "Add"}
                </Button>
                {toggleShowForm && (
                  <Button
                    data-testid="cancelButton"
                    type="reset"
                    onClick={() => toggleShowForm(false)}
                    disabled={isSubmitting || !isValid}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default connect(null, mapDispatch)(CustomerForm);
