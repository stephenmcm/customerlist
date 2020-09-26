import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Button } from "../../components/Button";

const CustomerRow = ({ onClick, customer }) => (
  <tr>
    <td>{customer.firstName}</td>
    <td>{customer.lastName}</td>
    <td>{format(new Date(customer.dateOfBirth), "dd/MM/yyyy")}</td>
    <td>
      <Button onClick={onClick}>x</Button>
    </td>
  </tr>
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
