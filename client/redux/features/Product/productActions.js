import axios from "axios";
import { server } from "../../store";
import { updateCategory } from "../category/categoryActions";

export const getnameProduct = (searchText) => async (dispatch) => {
  try {
    dispatch({ type: "fetchProductsRequest" });

    const response = await axios.get(`${server}/product/p/${searchText}`);

    dispatch({ type: "fetchProductsSuccess", payload: response.data.products });
  } catch (error) {
    dispatch({
      type: "fetchProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const fetchProducts = () => async (dispatch) => {
  //Get Product Data
  try {
    dispatch({ type: "fetchProductsRequest" });

    const { data } = await axios.get(`${server}/product/get-all`);

    dispatch({ type: "fetchProductsSuccess", payload: data.products });
  } catch (error) {
    dispatch({
      type: "fetchProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const createProduct =
  ({ formData, token, onSuccess }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${server}/product/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      onSuccess();
      console.log("Response:", response);
      // dispatch(
      //   updateCategory(
      //     response.data.createdProduct.category,
      //     response.data.createdProduct._id
      //   )
      // );

      dispatch({
        type: "createProductSuccess",
        payload: response.data.products,
      });
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: "createProductFail",
        payload: error.response ? error.response.data.message : "Unknown error",
      });
    }
  };

// export const createProduct = (formData, token) => async (dispatch) => {
//   try {
//     const response = await axios.post(`${server}/product/create`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // console.log(
//     //   "Response of Category to upload product:",
//     //   JSON.stringify(response)
//     // );
//     console.log(response.data, "KKKK");
//     // console.log(response.data.createdProduct.category);
//     // console.log(response.data.createdProduct._id);

//     dispatch(
//       updateCategory(
//         response.data.category,
//         response.data._id
//       )
//     );

//     dispatch({ type: "createProductSuccess", payload: response.data.products });
//   } catch (error) {
//     console.error("Error:", error);
//     dispatch({
//       type: "createProductFail",
//       payload: error.response ? error.response.data.message : "Unknown error",
//     });
//   }
// };
// export const Deleteproduct=(token)=>async(dispatch)=>{
//   try {

//   } catch (error) {

//   }
// }
export const deleteProduct = (productId, token) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    // Make an API request to delete the product
    await axios.delete(`${server}/product/delete/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: "deleteProductSuccess", payload: productId });
  } catch (error) {
    console.error("Error deleting product:", error);
    dispatch({
      type: "deleteProductFailure",
      payload: error.response ? error.response.data.message : "Unknown error",
    });
  }
};
//upate product
export const updateProduct =
  (productId, product, token) => async (dispatch) => {
    try {
      const response = await axios.put(
        `${server}/product/${productId}`,
        product,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Dispatch success action
        dispatch({
          type: "updateProductSuccess",
          payload: response.data.product,
        });
      } else {
        // Dispatch failure action
        dispatch({
          type: "updateProductFailure",
          payload: response.data.message,
        });
      }
    } catch (error) {
      // Dispatch failure action
      dispatch({ type: "updateProductFailure", payload: error.message });
    }
  };
