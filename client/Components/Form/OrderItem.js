import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OrderItem = ({ order }) => {
  console.log(order);

  // Function to calculate total amount
  const calculateTotalAmount = () => {
    let total = 0;
    order.orderItems.forEach((product) => {
      total += product.price * product.quantity;
    });
    // Add delivery fees
    total += 150; // Assuming delivery fees is 150 Rs
    return total;
  };

  return (
    <View style={styles.container}>
      <Text>Order ID: {order._id}</Text>
      <Text style={styles.productInfo}>Order Date: {order.createdAt}</Text>

      {order.orderItems.map((product, index) => (
        <View key={index} style={styles.productInfo}>
          <Text>Product Name: {product.name}</Text>
          <Text>Price: {product.price}</Text>
          <Text>Quantity: {product.quantity}</Text>
        </View>
      ))}

      {/* Display delivery fees */}
      <Text>Delivery Fees: 150 Rs</Text>
      {/* Display total amount by calling calculateTotalAmount function */}
      <Text>Total Amount: {calculateTotalAmount()} Rs</Text>
      <Text style={styles.status}>Status: {order.orderStatus}</Text>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  productInfo: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingBottom: 5,
    marginBottom: 10,
  },
  status: {
    borderTopWidth: 1,
    fontWeight: "bold",
    borderColor: "lightgray",
    padding: 5,
  },
});
