import { server } from "../../store";
import axios from "axios";
import { Alert } from "react-native";
// action login
export const login = (email, password, alert) => async (dispatch) => {
  console.log(email, password);

  try {
    dispatch({
      type: "loginRequest",
    });

    // hitting node login api request
    await axios
      .post(
        `${server}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        // alert('Login successful')
        console.log(response, "response");
        dispatch({
          type: "logingSucess",
          payload: response?.data,
        });
      })

    // console.log(data, "DATA");
  } catch (error) {
    alert("Wrong Credentials")
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

//Action Regiter
export const register = (userData, alert) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });
    const { data } = await axios.post(`${server}/user/register`, userData);

    dispatch({ type: "registerSuccess", payload: data.message });
    alert("Registered successfully")
  } catch (error) {
    alert("Email Already Registered ");
    dispatch({ type: "registerFail", payload: error.response.data.message });
  }
};


//Update User
// userActions.js
export const updateUser = (updatedUserData, token) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserRequest" });
    console.log(updatedUserData);
    await axios.put(`${server}/user/profile-update`, updatedUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // dispatch({type:"updateUserSuccess",payload:response.data});
  } catch (error) {
    
    dispatch({
      type: "updateUserFailure",
      payload: error.response.data.message,
    });
  }
};
