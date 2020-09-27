import React from "react";
import PropTypes from "prop-types";
import CustomerRow from "./CustomerRow";
import styles from "./Customer.module.scss";

const CustomerList = ({ customers }) => {
  return (
    <div>
      <div className={styles.CustomerRow}>
        <div className={styles.CustomerCol}>First Name</div>
        <div className={styles.CustomerCol}>Last Name</div>
        <div className={styles.CustomerCol}>Birthday</div>
        <div className={styles.CustomerCol}></div>
      </div>
      {customers.map((customer) => (
        <CustomerRow key={customer.id} customer={customer} />
      ))}
    </div>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      dateOfBirth: PropTypes.string,
      deleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default CustomerList;
