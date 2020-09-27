import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "visibilityFilters",
  initialState: { searchString: "" },
  reducers: {
    setSearchStringFilter(state, action) {
      state.searchString = action.payload;
    },
  },
});

export const { setSearchStringFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
