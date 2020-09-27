import { createSlice } from "@reduxjs/toolkit";

// @TODO swap to UUIDs or otherwise handle this better as when it gets out of
// sync with the list we risk overwritting data
// Tested swapping to nanoid and ran into "TypeError: (0 , _nanoid.nanoid) is not a function"
// in tests. Github issue here: https://github.com/facebook/create-react-app/pull/8768
export const nextcustomer = { Id: 0 };

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
            id: nextcustomer.Id++,
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
