import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Button } from "../../components/Button";
import styles from "./Customer.module.scss";
import CustomerForm from "./CustomerForm";
import { connect, useDispatch } from "react-redux";
import { deleteCustomer, removeCustomer } from "./customersSlice";

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

const CustomerRow = ({ customer, deleteCustomer }) => {
  const [showForm, toggleShowForm] = useState(false);
  const dispatch = useDispatch();

  const deleteCust = () => {
    deleteCustomer(customer.id);
    dispatch(removeCustomer(customer));
  };

  return showForm ? (
    <CustomerForm customer={customer} toggleShowForm={toggleShowForm} />
  ) : (
    <ReadRow
      customer={customer}
      toggleShowForm={toggleShowForm}
      deleteCustomer={deleteCust}
    />
  );
};

CustomerRow.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.string,
    deleted: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapDispatchToProps = { deleteCustomer };

export default connect(null, mapDispatchToProps)(CustomerRow);
