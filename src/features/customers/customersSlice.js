import { createSlice } from "@reduxjs/toolkit";

// @TODO swapp to UUIDs or otherwise handle this better as when it gets out of
// sync with the list we risk overwritting data
let nextcustomerId = 0;

const intialDummyState = {
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
};

const customersSlice = createSlice({
  name: "customers",
  initialState: { byID: {} },
  reducers: {
    addCustomer: {
      reducer(state, action) {
        const { id, firstName, lastName, dateOfBirth } = action.payload;
        state.byID[id] = {
          id,
          firstName,
          lastName,
          dateOfBirth,
          deleted: false,
          searchText: `${firstName} ${lastName}`.toLowerCase(),
        };
      },
      prepare({ firstName, lastName, dateOfBirth }) {
        return {
          payload: {
            firstName,
            lastName,
            dateOfBirth,
            id: nextcustomerId++,
          },
        };
      },
    },
    editCustomer(state, action) {
      const { id, firstName, lastName, dateOfBirth } = action.payload;
      state.byID[id] = {
        id,
        firstName,
        lastName,
        dateOfBirth,
        // @TODO Rework handling of editting deleted customers
        deleted: false,
        // @TODO this should be handled in a function so that add and edit don't get out os sync
        searchText: `${firstName} ${lastName}`.toLowerCase(),
      };
    },
    deleteCustomer(state, action) {
      const customer = state.byID[action.payload];
      if (customer) {
        customer.deleted = !customer.deleted;
      }
    },
  },
});

export const {
  addCustomer,
  deleteCustomer,
  editCustomer,
} = customersSlice.actions;

export default customersSlice.reducer;
