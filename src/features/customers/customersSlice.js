import { createSlice } from "@reduxjs/toolkit";

let nextcustomerId = 0;

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
          searchText: `${firstName} ${lastName}`,
        };
      },
      prepare({ id, firstName, lastName, dateOfBirth }) {
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
    deleteCustomer(state, action) {
      const customer = state.byID[action.payload];
      if (customer) {
        customer.deleted = !customer.deleted;
      }
    },
  },
});

export const { addCustomer, deleteCustomer } = customersSlice.actions;

export default customersSlice.reducer;
