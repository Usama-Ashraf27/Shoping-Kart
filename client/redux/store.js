import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/auth/userReducer";
import { productReducer } from "./features/Product/productReducer";
import { categoryReducer } from "./features/category/categoryReducer";
import { OrderReducer } from "./features/Order/OrderReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    category: categoryReducer,
    order: OrderReducer,
  },
});

//Host
export const server = "http://192.168.2.27:8080/api/v1";
