import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "../features/customers/customersSlice";

export default configureStore({
  reducer: {
    customers: customersReducer,
  },
});
