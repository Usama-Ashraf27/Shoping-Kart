import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Components/Layout/Layout";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CreateOrder } from "../redux/features/Order/OrderActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Checkout = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user.token);
  const userData = useSelector((state) => state.user.userData);
  const { address, city, country } = userData;
  const { cartItems, shippingCharges, totalAmounts } = route.params;

  const handleCOD = async () => {
    const shippingInfo = {
      address: userData.address,
      city: userData.city,
      country: userData.country,
    };
    const paymentMethod = "COD";
    const user = userData._id;
    const paymentInfo = {
      id: "payment123",
      status: "success",
    };
    const orderStatus = "processing";

    // Calculate total item price
    const itemPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Ensure totalAmount is a valid number
    const totalAmount = !isNaN(parseFloat(totalAmount))
      ? parseFloat(totalAmounts)
      : itemPrice + shippingCharges;

    const orderItems = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    dispatch(
      CreateOrder(
        token,
        shippingInfo,
        orderItems,
        paymentMethod,
        user,
        paymentInfo,
        itemPrice,
        shippingCharges,
        orderStatus
      )
    );

    // Clear cart items from AsyncStorage
    await AsyncStorage.removeItem("cartItems");

    alert("Your Order Has Been Placed Successfully");

    // Update cart items in the cart screen
    navigation.setParams({ updateCartItems: true });

    // Navigate back to the cart screen
    navigation.navigate("Home",);
  };

  const handleOnline = async() => {

    const orderItems = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
    alert("Your Redirecting to the payment gateway",{totalAmounts});
    navigation.navigate("payment",{orderItems});
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>Payment Options</Text>
        <Text style={styles.price}>Total Amount: RS {totalAmounts}</Text>
        <View style={styles.userDetails}>
          <Text style={styles.userText}>Address: {address}</Text>
          <Text style={styles.userText}>City: {city}</Text>
          <Text style={styles.userText}>Country: {country}</Text>
        </View>
        <View style={styles.paymentCard}>
          <Text style={styles.paymentHeading}>Select your Payment Mode</Text>
          <TouchableOpacity style={styles.paymentBtn} onPress={handleCOD}>
            <Text style={styles.paymentBtnText}>Cash On Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentBtn} onPress={handleOnline}>
            <Text style={styles.paymentBtnText}>
              Online (CREDIT | DEBIT CARD)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: hp("80%"),
  },
  heading: {
    fontSize: hp("3.5%"),
    fontWeight: "500",
    marginVertical: hp("2%"),
  },
  price: {
    fontSize: hp("2%"),
    marginBottom: hp("2%"),
    color: "gray",
  },
  userDetails: {
    width: wp("90%"),
    borderRadius: wp("2%"),
    backgroundColor: "#ffffff",
    padding: wp("5%"),
    marginBottom: hp("2%"),
  },
  userText: {
    color: "gray",
    marginBottom: hp("1%"),
  },
  paymentCard: {
    backgroundColor: "#ffffff",
    width: wp("90%"),
    borderRadius: wp("2%"),
    padding: wp("5%"),
    marginVertical: hp("2%"),
  },
  paymentHeading: {
    color: "gray",
    marginBottom: hp("2%"),
  },
  paymentBtn: {
    backgroundColor: "#000000",
    height: hp("5%"),
    borderRadius: wp("2%"),
    justifyContent: "center",
    marginVertical: hp("2%"),
  },
  paymentBtnText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: hp("2%"),
  },
});

export default Checkout;
