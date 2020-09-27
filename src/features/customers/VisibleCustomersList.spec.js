import { selectVisibleCustomers } from "./VisibleCustomersList";

const dummyState = {
  customers: {
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
  visibilityFilter: {
    searchString: "",
  },
};

describe("Visibility Filter", () => {
  it("should handle no search string", () => {
    expect(selectVisibleCustomers(dummyState)).toEqual(
      Object.values(dummyState.customers.byID)
    );
  });

  let searchState = Object.assign({}, dummyState);
  searchState.visibilityFilter = { searchString: "stephen" };
  it("should handle single strings", () => {
    expect(selectVisibleCustomers(searchState)).toEqual([
      dummyState.customers.byID[0],
    ]);
  });

  searchState = Object.assign({}, dummyState);
  searchState.visibilityFilter = { searchString: "sTePhEn" };
  it("should handle single strings with changes in case", () => {
    expect(selectVisibleCustomers(searchState)).toEqual([
      dummyState.customers.byID[0],
    ]);
  });

  searchState = Object.assign({}, dummyState);
  searchState.visibilityFilter = { searchString: "s mcmahon" };
  it("should handle multiple strings", () => {
    expect(selectVisibleCustomers(searchState)).toEqual([
      dummyState.customers.byID[0],
    ]);
  });
});
