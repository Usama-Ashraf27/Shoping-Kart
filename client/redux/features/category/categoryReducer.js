import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  categories: [],
  selectedCategoryProductsAsTrending: [],
  selectedCategoryProductsAsFlash: [],
  error: null,
};

export const categoryReducer = createReducer(initialState, (builder) => {
  //Get All Categories Builder
  builder.addCase("getCategoryRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("getCategorySuccess", (state, action) => {
    state.loading = false;
    state.categories = action.payload;
  });
  builder.addCase("getCategoryFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  //Create a new catethort
  builder.addCase("createCategoryRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("CreateCategorySuccess", (state, action) => {
    state.loading = false;
    const { categoryId, productId } = action.payload;
    const categoryToUpdate = state.categories.find(
      (category) => category._id === categoryId
    );

    if (categoryToUpdate) {
      categoryToUpdate.products.push(productId);
    }
  });
  builder.addCase("CreateCategoryFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  //Update All Categories
  builder.addCase("updateCategoryRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("updateCategorySuccess", (state, action) => {
    state.loading = false;
    const updatedCategoryIndex = state.categories.findIndex(
      (category) => category._id === action.payload._id
    );
    if (updatedCategoryIndex !== -1) {
      state.categories[updatedCategoryIndex] = action.payload;
    }
  });
  builder.addCase("updateCategoryFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  //delete category
  builder.addCase("deleteCategory", (state, action) => {
    state.loading = true;
  });
  builder.addCase("deleteCategorySuccess", (state, action) => {
    state.loading = false;
    const deletedCategoryId = action.payload; // Assuming the payload is the ID of the deleted category
    state.categories = state.categories.filter(
      (category) => category._id !== deletedCategoryId
    );
  });
  builder.addCase("deleteCategoryFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  //get Signle Category
  builder.addCase("getProductsByCategoryRequest", (state) => {
    state.loading = true;
  });

  builder.addCase("getProductsByCategoryEmpty", (state) => {
    state.selectedCategoryProductsAsFlash = {};
    state.selectedCategoryProductsAsTrending = {};
  });

  builder.addCase("getProductsByCategorySuccess", (state, action) => {
    // console.log(JSON.stringify(action.payload.products), "PRODUCTS AT REDUCER");
    state.loading = false;
    if (action.payload._id === "65b266858ff536fd0db19e19") {
      state.selectedCategoryProductsAsFlash = action.payload.products;
    }
    if (action.payload._id === "65afe2d4865addd71567d4de") {
      state.selectedCategoryProductsAsTrending = action.payload.products;
    }
  });

  builder.addCase("getProductsByCategoryFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
});
