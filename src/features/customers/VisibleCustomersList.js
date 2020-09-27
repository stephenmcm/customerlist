import { connect } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { deleteCustomer } from "./customersSlice";
import CustomerList from "./CustomerList";

const selectCustomers = (state) => state.customers.byID;
const searchFilter = (state) => state.visibilityFilter.searchString;

const selectVisibleCustomers = createSelector(
  [selectCustomers, searchFilter],
  (customers, filter) => {
    if (filter.length > 2) {
      return Object.values(customers).filter((c) =>
        c.searchText.includes(filter)
      );
    }
    return Object.values(customers);
  }
);

const mapStateToProps = (state) => ({
  customers: selectVisibleCustomers(state),
});

const mapDispatchToProps = { deleteCustomer };

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
