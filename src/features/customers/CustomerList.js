import React from "react";
import PropTypes from "prop-types";
import CustomerRow from "./CustomerRow";

const CustomerList = ({ customers, deleteCustomer }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Birthday</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Object.values(customers).map((customer) => (
          <CustomerRow
            key={customer.id}
            customer={customer}
            onClick={() => deleteCustomer(customer.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.objectOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      dateOfBirth: PropTypes.string,
      deleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteCustomer: PropTypes.func.isRequired,
};

export default CustomerList;
