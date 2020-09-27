import { connect } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { deleteCustomer } from "./customersSlice";
import CustomerList from "./CustomerList";

const selectCustomers = (state) => state.customers.byID;
const searchFilter = (state) => state.visibilityFilter.searchString;

// @TODO Exporting to write tests for this feels wrong. Research if there's a better pattern
export const selectVisibleCustomers = createSelector(
  [selectCustomers, searchFilter],
  (customers, filter) => {
    const search = filter.toLowerCase().split(" ");
    let result = Object.values(customers);
    if (search.length) {
      search.forEach((searchString) => {
        result = result.filter((c) => c.searchText.includes(searchString));
      });
    }
    return result;
  }
);

const mapStateToProps = (state) => ({
  customers: selectVisibleCustomers(state),
});

const mapDispatchToProps = { deleteCustomer };

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
