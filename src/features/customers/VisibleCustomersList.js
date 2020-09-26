import { connect } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { deleteCustomer } from "./customersSlice";
// import { VisibilityFilters } from "features/filters/filtersSlice";
import CustomerList from "./CustomerList";

const selectCustomers = (state) => state.customers.byID;
const selectFilter = (state) => true;

const selectVisibleCustomers = createSelector(
  [selectCustomers, selectFilter],
  (customers, filter) => {
    switch (filter) {
      case true:
        return customers;
      //   case VisibilityFilters.SHOW_COMPLETED:
      //     return customers.filter((t) => t.completed);
      //   case VisibilityFilters.SHOW_ACTIVE:
      //     return customers.filter((t) => !t.completed);
      default:
        throw new Error("Unknown filter: " + filter);
    }
  }
);

const mapStateToProps = (state) => ({
  customers: selectVisibleCustomers(state),
});

const mapDispatchToProps = { deleteCustomer };

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
