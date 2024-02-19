import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orders: [], // Ensure that you have this initial state property
  error: null,
  cartCount: 0,
  totalCartItem: [],
};

export const OrderReducer = createReducer(initialState, (builder) => {
  //Cart Items
  builder.addCase("setCartCountRequest", (state, action) => {
    state.cartCount = action.payload;
  });
  builder.addCase("setTotalCartItemRequest", (state, action) => {
    state.totalCartItem = action.payload;
  });

  //Create the order
  builder.addCase("createOrderRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("CreateOrderSuccess", (state, action) => {
    state.loading = false;
    const orderData = action.payload.order;
    state.orders = [...state.orders, orderData];
  });
  builder.addCase("CreateOrderFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // Get the order
  builder.addCase("orderRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("orderSuccess", (state, action) => {
    state.loading = false;
    state.orders = action.payload; // Update orders property
  });
  builder.addCase("orderFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  //Admin Order
  builder.addCase("AdminOrderRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("AdminOrderSuccess", (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  });
  builder.addCase("AdminOrderFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  //Order Status
  builder.addCase("orderStatusRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("orderStatusSuccess", (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  });
  builder.addCase("orderStatusFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  //payment method
  builder.addCase("paymentMethodRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("paymentMethodsucces", (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  });
  builder.addCase("paymentMethodFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
});
