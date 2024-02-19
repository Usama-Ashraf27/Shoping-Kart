import axios from "axios";
import { server } from "../../store";
const initialState = {
  categories: [], // Ensure that categories is always initialized as an array
  // other properties...
};
//Get All Categories
export const getCategory =
  (state = initialState, action) =>
  async (dispatch) => {
    try {
      dispatch({ type: "getCategoryRequest" });

      const { data } = await axios.get(`${server}/category/get-all`);

      dispatch({ type: "getCategorySuccess", payload: data.categories });
    } catch (error) {
      dispatch({
        type: "getCategoryFail",
        payload: error.response.data.message,
      });
    }
  };
//Create a new category
export const createCategory = (category, token) => async (dispatch) => {
  try {
    await axios
      .post(
        `${server}/category/create`,
        { category },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => console.log(error));
  } catch (error) {
    dispatch({
      type: "CreateCategoryFailure",
      payload: error.response.data.message,
    });
  }
};

//Update the CAtgory
export const updateCategory =
  (categoryId, newName, token) => async (dispatch) => {
    try {
      // dispatch({ type: "updateCategoryRequest" });
      await axios
        .patch(
          `${server}/category/update/${categoryId}`,
          { updatedCategory: newName },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        // .then((response) => console.log(response, "CAT RES"))
        .catch((error) => console.log(error));

      // console.log(data, "DATA");

      // dispatch({
      //   type: "updateCategorySuccess",
      //   payload: data.updatedCategory,
      // });
    } catch (error) {
      dispatch({
        type: "updateCategoryFail",
        payload: error.response.data.message,
      });
    }
  };

//delete category
export const deleteCategory = (categoryId, token) => async (dispatch) => {
  try {
    await axios.delete(`${server}/category/delete/${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "deleteCategorySuccess",
      payload: categoryId, // Pass the deleted category ID as the payload
    });

    dispatch(getCategory()); // Call the getCategory dispatch to update the categories list
  } catch (error) {
    dispatch({
      type: "deleteCategoryFailure",
      payload: error.response.data.message,
    });
  }
};

//Single category Get
export const getProductsByCategory =
  ({ setLoading, categoryId }) =>
  async (dispatch) => {
    if (setLoading) {
      setLoading(true);
    }
    try {
      dispatch({ type: "getProductsByCategoryRequest" });

      const response = await axios.get(`${server}/category/${categoryId}`);
      if (setLoading) {
        setLoading(false);
      }
      dispatch({
        type: "getProductsByCategorySuccess",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "getProductsByCategoryFailure",
        payload: error.response.data.message,
      });
      if (setLoading) {
        setLoading(false);
      }
    }
  };
