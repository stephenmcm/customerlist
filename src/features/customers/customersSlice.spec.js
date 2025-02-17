import customers, {
  addCustomer,
  deleteCustomer,
  editCustomer,
} from "./customersSlice";

describe("customers reducer", () => {
  it("should handle initial state", () => {
    expect(customers(undefined, {})).toEqual({ byID: {} });
  });

  it("should handle add customer", () => {
    expect(
      customers(
        { byID: {} },
        {
          type: addCustomer.type,
          payload: {
            dateOfBirth: "01/02/2019",
            deleted: false,
            firstName: "Test",
            id: 0,
            lastName: "User",
          },
        }
      )
    ).toEqual({
      byID: {
        0: {
          dateOfBirth: "01/02/2019",
          deleted: false,
          firstName: "Test",
          id: 0,
          lastName: "User",
          searchText: "test user",
        },
      },
    });

    expect(
      customers(
        {
          byID: {
            0: {
              dateOfBirth: "01/02/2019",
              deleted: false,
              firstName: "Test",
              id: 0,
              lastName: "User",
              searchText: "test user",
            },
          },
        },
        {
          type: addCustomer.type,
          payload: {
            dateOfBirth: "01/02/2019",
            deleted: false,
            firstName: "Other",
            id: 1,
            lastName: "Test",
            searchText: "other test",
          },
        }
      )
    ).toEqual({
      byID: {
        0: {
          dateOfBirth: "01/02/2019",
          deleted: false,
          firstName: "Test",
          id: 0,
          lastName: "User",
          searchText: "test user",
        },
        1: {
          dateOfBirth: "01/02/2019",
          deleted: false,
          firstName: "Other",
          id: 1,
          lastName: "Test",
          searchText: "other test",
        },
      },
    });
  });

  it("should handle delete customer", () => {
    expect(
      customers(
        {
          byID: {
            0: {
              dateOfBirth: "01/02/2019",
              deleted: false,
              firstName: "Test",
              id: 0,
              lastName: "User",
              searchText: "test user",
            },
            1: {
              dateOfBirth: "01/02/2019",
              deleted: false,
              firstName: "Other",
              id: 1,
              lastName: "Test",
              searchText: "other test",
            },
          },
        },
        {
          type: deleteCustomer.type,
          payload: 1,
        }
      )
    ).toEqual({
      byID: {
        0: {
          dateOfBirth: "01/02/2019",
          deleted: false,
          firstName: "Test",
          id: 0,
          lastName: "User",
          searchText: "test user",
        },
        1: {
          dateOfBirth: "01/02/2019",
          deleted: true,
          firstName: "Other",
          id: 1,
          lastName: "Test",
          searchText: "other test",
        },
      },
    });
  });

  it("should handle edit customer", () => {
    expect(
      customers(
        {
          byID: {
            0: {
              dateOfBirth: "01/02/2019",
              deleted: false,
              firstName: "Test",
              id: 0,
              lastName: "User",
              searchText: "test user",
            },
            1: {
              dateOfBirth: "01/02/2019",
              deleted: false,
              firstName: "Other",
              id: 1,
              lastName: "Test",
              searchText: "other test",
            },
          },
        },
        {
          type: editCustomer.type,
          payload: {
            id: 0,
            dateOfBirth: "01/02/2019",
            firstName: "Test",
            lastName: "Edited",
          },
        }
      )
    ).toEqual({
      byID: {
        0: {
          id: 0,
          dateOfBirth: "01/02/2019",
          deleted: false,
          firstName: "Test",
          lastName: "Edited",
          searchText: "test edited",
        },
        1: {
          dateOfBirth: "01/02/2019",
          deleted: false,
          firstName: "Other",
          id: 1,
          lastName: "Test",
          searchText: "other test",
        },
      },
    });
  });
});

describe("addCustomer", () => {
  it("should generate incrementing customer IDs", () => {
    const action1 = addCustomer({
      dateOfBirth: "01/02/2019",
      firstName: "Test",
      lastName: "User",
    });
    const action2 = addCustomer({
      dateOfBirth: "01/02/2019",
      firstName: "Other",
      lastName: "Test",
    });

    expect(action1.payload).toEqual({
      id: 0,
      dateOfBirth: "01/02/2019",
      firstName: "Test",
      lastName: "User",
    });
    expect(action2.payload).toEqual({
      id: 1,
      dateOfBirth: "01/02/2019",
      firstName: "Other",
      lastName: "Test",
    });
  });
});

describe("editCustomer", () => {
  it("should update customer", () => {
    const action = editCustomer({
      id: 0,
      dateOfBirth: "01/02/2019",
      firstName: "Test",
      lastName: "Edited",
    });
    expect(action.payload).toEqual({
      id: 0,
      dateOfBirth: "01/02/2019",
      firstName: "Test",
      lastName: "Edited",
    });
  });
});
