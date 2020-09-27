import { configureStore } from "@reduxjs/toolkit";
import customersReducer, {
  nextcustomer,
} from "../features/customers/customersSlice";
import visibilityFilterReducer from "../features/filters/filtersSlice";

const intialDummyState = {
  customers: {
    lastID: 3,
    byID: {
      0: {
        id: 0,
        firstName: "Stephen",
        lastName: "McMahon",
        dateOfBirth: "1987-06-29",
        deleted: false,
        searchText: "stephen mcmahon",
      },
      1: {
        id: 1,
        firstName: "Ada",
        lastName: "Lovelace",
        dateOfBirth: "1815-12-10",
        deleted: false,
        searchText: "ada lovelace",
      },
      2: {
        id: 2,
        firstName: "Alan",
        lastName: "Turing",
        dateOfBirth: "1912-06-23",
        deleted: false,
        searchText: "alan turing",
      },
      3: {
        id: 3,
        firstName: "Tim",
        lastName: "Berners-Lee",
        dateOfBirth: "2020-09-09",
        deleted: false,
        searchText: "tim berners-lee",
      },
    },
  },
};

// @TODO swap to UUIDs or otherwise handle this better as when it gets out of
// sync with the list we risk overwritting data.
nextcustomer.Id = 4;

export default configureStore({
  reducer: {
    customers: customersReducer,
    visibilityFilter: visibilityFilterReducer,
  },
  preloadedState: intialDummyState,
});
