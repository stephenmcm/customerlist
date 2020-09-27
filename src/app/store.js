import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "../features/customers/customersSlice";
import visibilityFilterReducer from "../features/filters/filtersSlice";

export default configureStore({
  reducer: {
    customers: customersReducer,
    visibilityFilter: visibilityFilterReducer,
  },
});
