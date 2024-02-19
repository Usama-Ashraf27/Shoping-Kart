import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  error: null,
  cartCount: 0,
};

export const productReducer = createReducer(initialState, (builder) => {
  //get All products
  builder.addCase("fetchProductsRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("fetchProductsSuccess", (state, action) => {
    state.loading = false;
    state.products = action.payload;
  });
  builder.addCase("fetchProductsFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  //get Products in the base of name Search
  builder.addCase("getnameProductsRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("getnameProductsSuccess", (state, action) => {
    state.loading = false;
    state.products = action.payload;
  });
  builder.addCase("getnameProductsFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  //Create a new product
  builder.addCase("createProductRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("createProductSuccess", (state, action) => {
    state.loading = false;
    state.products = action.payload;
  });
  builder.addCase("createProductFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  //Delete product
  builder.addCase("deleteProductRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("deleteProductSuccess", (state, action) => {
    state.loading = false;
    state.products = state.products.filter(
      (product) => product._id !== action.payload
    );
  });

  builder.addCase("deleteProductFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  //update product
  builder.addCase("updateProductRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("updateProductSuccess", (state, action) => {
    state.loading = false;
    const updatedProduct = action.payload;
    state.products = state.products.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    );
  });

  builder.addCase("updateProductFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
});
