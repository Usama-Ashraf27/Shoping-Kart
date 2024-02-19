import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { changeOrderStatus } from '../../redux/features/Order/OrderActions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";

const AdminOrderItems = ({ order }) => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const [selectedStatus, setSelectedStatus] = useState(order.orderStatus);
  const [statusOptions, setStatusOptions] = useState([
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
  ]);

  useEffect(() => {
    const selectedIndex = statusOptions.findIndex(option => option.value === order.orderStatus);
    setSelectedStatus(selectedIndex !== -1 ? statusOptions[selectedIndex].value : null);
  }, [order, statusOptions]);

  useEffect(() => {
    // Check if status has changed and do something, e.g., fetch orders
    if (selectedStatus !== order.orderStatus) {
      // Perform any action you need here, such as fetching orders again
      console.log("Status changed. Fetching orders again...");
    }
  }, [selectedStatus, order]);

  const handleStatusChange = async (newStatus) => {
    try {
      // Disable status change if the current status is "Shipped"
      if (order.orderStatus === 'shipped') {
        console.log('Status is already shipped. Cannot change.');
        return;
      }

      // Pass order._id and newStatus to the dispatch function
      await dispatch(changeOrderStatus(order._id, newStatus, token));
      // Update the local state to reflect the selected status
      setSelectedStatus(newStatus);

      // Show an alert after changing the status
      Alert.alert('Status Changed', 'Order status has been updated.');
      // Navigate back to admin panel
      navigation.navigate("adminPanel");
    } catch (error) {
      // Handle error if needed
      console.error('Error changing order status:', error);
    }
  };

  // Calculate total product amount
  const calculateTotalProductAmount = () => {
    let total = 0;
    order.orderItems.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };

  // Calculate total amount including delivery charges
  const calculateTotalAmount = () => {
    return calculateTotalProductAmount() + 150; // Add delivery charges
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

      <Text>Total Product Amount: {calculateTotalProductAmount()} Rs</Text>
      <Text>Delivery Charges: 150 Rs</Text>
      <Text>Total Amount: {calculateTotalAmount()} Rs</Text>

      {/* Displaying Address Details */}
      <Text>Shipping Address:</Text>
      <Text>{order.shippingInfo.address}</Text>
      <Text>{order.shippingInfo.city}</Text>
      <Text>{order.shippingInfo.country}</Text>

      {/* Displaying Payment Method */}
      <Text style={{ color: order.paymentMethod === 'COD' ? 'red' : 'green' }}>
        Payment Method: {order.paymentMethod}
      </Text>

      {/* Order Status Dropdown */}
      <Text>Status:</Text>
      <RNPickerSelect
        value={selectedStatus}
        onValueChange={handleStatusChange}
        items={statusOptions}
      />

      {/* Additional Status Details */}
      {selectedStatus === 'shipped' && (
        <Text>Shipped Completed in 2 working days. You will receive the order soon.</Text>
      )}
    </View>
  );
};

export default AdminOrderItems;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  productInfo: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: 5,
    marginBottom: 10,
  },
});
