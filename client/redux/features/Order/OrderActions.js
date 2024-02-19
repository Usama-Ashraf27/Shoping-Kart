import Axios from "axios";
import { server } from "../../store";

export const CreateOrder = (
  token,
  shippingInfo,
  orderItems,
  paymentMethod,
  user,
  paymentInfo,
  itemPrice,
  shippingCharges,

  orderStatus
) => async (dispatch) => {
    try {
      dispatch({ type: "createOrderRequest" });
      const response = await Axios.post(
        `${server}/order/create`,
        {
          shippingInfo,
          orderItems,
          paymentMethod,
          user,
          paymentInfo,
          itemPrice,
          shippingCharges,
          
          orderStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const createdOrder = response.data.order;
      dispatch({ type: "CreateOrderSuccess", payload: createdOrder });
      alert("Your Order Has Been Placed Successfully");
    } catch (error) {
      dispatch({ type: "CreateOrderFailure", payload: error.message });
    }
  };

export const getOrder = (token) => async (dispatch) => {
  try {
    dispatch({ type: "orderRequest" });

    const { data } = await Axios.get(`${server}/order/my-order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Data received from the server:", data);

    dispatch({ type: "orderSuccess", payload: data.orders });
  } catch (error) {
    dispatch({ type: "orderFailure", payload: error.message });
  }
};

export const GetAdminOrder = (token) => async (dispatch) => {
  try {
    dispatch({ type: "AdminOrderRequest" });
    const { data } = await Axios.get(`${server}/order/admin/get-all-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "AdminOrderSuccess", payload: data.orders });
  } catch (error) {
    dispatch({ type: "AdminOrderFailure", payload: error.message });
  }
};

export const changeOrderStatus =
  (orderId, newStatus, token) => async (dispatch) => {
    try {
      dispatch({ type: "orderStatusRequest" });

      // Include data in the request body
      const { data } = await Axios.put(
        `${server}/order/admin/order/${orderId}`,
        { newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: "orderStatusSuccess", payload: data.orders });
    } catch (error) {
      dispatch({ type: "orderStatusFailure", payload: error.message });
    }
  };


  export const PaymentNow=(token,totalAmount)=> async(dispatch)=>{
try {
  dispatch({ type: "paymentMethodRequest" });
  const response=await Axios.post(`${server}/order/payments`, { totalAmount },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const paymentdone = response.data.order;
} catch (error) {
  dispatch({ type: "paymentMethodFailure", payload: error.message });
}
  }