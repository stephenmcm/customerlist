import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Button } from "../../components/Button";
import styles from "./Customer.module.scss";
import CustomerForm from "./CustomerForm";

const ReadRow = ({ customer, toggleShowForm, deleteCustomer }) => (
  <div className={styles.CustomerRow}>
    <div className={styles.CustomerCol}>{customer.firstName}</div>
    <div className={styles.CustomerCol}>{customer.lastName}</div>
    <div className={styles.CustomerCol}>
      {format(new Date(customer.dateOfBirth), "dd/MM/yyyy")}
    </div>
    <div className={styles.CustomerCol}>
      <Button onClick={() => toggleShowForm(true)}>Edit</Button>
      <Button variety="danger" onClick={deleteCustomer}>
        Delete
      </Button>
    </div>
  </div>
);

const CustomerRow = ({ deleteCustomer, customer }) => {
  const [showForm, toggleShowForm] = useState(false);
  return showForm ? (
    <CustomerForm customer={customer} toggleShowForm={toggleShowForm} />
  ) : (
    <ReadRow
      customer={customer}
      toggleShowForm={toggleShowForm}
      deleteCustomer={deleteCustomer}
    />
  );
};

CustomerRow.propTypes = {
  deleteCustomer: PropTypes.func.isRequired,
  customer: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.string,
    deleted: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CustomerRow;
