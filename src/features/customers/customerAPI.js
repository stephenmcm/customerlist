export const customerAPI = {
  post: (customer) => {
    return { status: 200, body: { customer } };
  },
  get: (id) => {
    return {
      status: 404,
      body: { message: "No Customer found by that id" },
    };
  },
  put: (customer) => {
    return { status: 200, body: { customer } };
  },
  delete: (customer) => {
    return {
      status: 200,
      body: { id: customer.id },
    };
  },
};
