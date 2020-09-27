import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Button } from "../../components/Button";
import styles from "./Customer.module.scss";

const CustomerRow = ({ onClick, customer }) => (
  <div>
    <div className={styles.CustomerRow}>
      <div className={styles.CustomerCol}>{customer.firstName}</div>
      <div className={styles.CustomerCol}>{customer.lastName}</div>
      <div className={styles.CustomerCol}>
        {format(new Date(customer.dateOfBirth), "dd/MM/yyyy")}
      </div>
      <div className={styles.CustomerCol}>
        <Button onClick={onClick}>Edit</Button>
        <Button type="danger" onClick={onClick}>
          Delete
        </Button>
      </div>
    </div>
  </div>
);

CustomerRow.propTypes = {
  onClick: PropTypes.func.isRequired,
  customer: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.string,
    deleted: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CustomerRow;
