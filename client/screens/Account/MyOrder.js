import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import OrderItem from "../../Components/Form/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../redux/features/Order/OrderActions";

const MyOrder = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user.token);
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    if (token) { 
        dispatch(getOrder(token));
    }
}, [dispatch, token]);
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>My Order</Text>
        <ScrollView>
          {orders && orders.length > 0 ? (
            orders.map((order) => <OrderItem key={order._id} order={order} />)
          ) : (
            <Text>No orders available</Text>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: '29%',
  },
  heading: {
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
    fontSize: 20,
  },
});
