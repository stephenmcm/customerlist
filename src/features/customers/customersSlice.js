import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customerAPI } from "./customerAPI";

// @TODO swap to UUIDs or otherwise handle this better as when it gets out of
// sync with the list we risk overwritting data
// Tested swapping to nanoid and ran into "TypeError: (0 , _nanoid.nanoid) is not a function"
// in tests. Github issue here: https://github.com/facebook/create-react-app/pull/8768
export const nextcustomer = { Id: 0 };

export const saveCustomer = createAsyncThunk(
  "customers/saveCustomer",
  async (customer, thunkAPI) => {
    // @TODO we need to check if the customer is:
    // - New use POST
    // - Existing use PUT
    const response = await customerAPI.post(customer);
    return response;
  }
);

export const removeCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customer, thunkAPI) => {
    // @TODO we need to check if the customer is:
    // - New use POST
    // - Existing use PUT
    const response = await customerAPI.delete(customer);
    return response;
  }
);

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
  extraReducers: {
    [removeCustomer.fulfilled]: (state, action) => {
      delete state.byID[action.payload.body.id];
    },
  },
});

export const {
  addCustomer,
  deleteCustomer,
  editCustomer,
} = customersSlice.actions;

export default customersSlice.reducer;
