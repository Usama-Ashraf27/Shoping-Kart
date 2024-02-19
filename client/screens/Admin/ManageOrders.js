import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import OrderItem from "../../Components/Form/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import { GetAdminOrder } from "../../redux/features/Order/OrderActions";
import AdminOrderItems from "../Account/AdminOrderItems";

const ManageOrders = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user.token);
  const orders = useSelector((state) => state.order.orders);
console.log(orders)
  useEffect(() => {
    if (token) { 
        dispatch(GetAdminOrder(token));
    }
}, [dispatch, token]);
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>My Order</Text>
        <ScrollView>
          {orders && orders.length > 0 ? (
            orders.map((order) => <AdminOrderItems key={order._id} order={order} />)
          ) : (
            <Text>No orders available</Text>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
};

export default ManageOrders;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingBottom:"27%",
  },
  heading: {
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
    fontSize: 20,
  },
});
