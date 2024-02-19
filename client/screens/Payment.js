import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { useDispatch, useSelector } from "react-redux";
import { CreateOrder, PaymentNow } from "../redux/features/Order/OrderActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Payment = ({ navigation,route }) => {
  const token = useSelector((state) => state?.user.token);
  const userData = useSelector((state) => state.user.userData);
  
  const { orderItems } = route.params;
  const dispatch = useDispatch();

  const [formValid, setFormValid] = useState(false); // State to track form validity

  const [cardData, setCardData] = useState({
    isValid: false,
    values: {},
  });

  const itemPrices = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemPrice = itemPrices + 150 ;

  const handlePayNow = async() => {
    if (formValid) { // Proceed with payment only if form is valid
      const shippingInfo = {
        address: userData.address,
        city: userData.city,
        country: userData.country,
      };
      const paymentMethod = "ONLINE";
      const user = userData._id;
      const orderStatus = "processing";
      dispatch(PaymentNow(token,itemPrice))
      dispatch(
        CreateOrder(
          token,
          shippingInfo,
          orderItems,
          paymentMethod,
          user,
          itemPrice,
          orderStatus
        )
      );
      alert("Your Order Has Been Placed Successfully");
      await AsyncStorage.removeItem("cartItems");
      navigation.setParams({ updateCartItems: true });
         navigation.navigate("Home",);
    } else {
      console.log("Please fill in all card details.");
    }
  };

  // Update form validity based on card input onChange event
  const handleCardInputChange = (formData) => {
    setCardData(formData);
    const { values } = formData;
    const isFormValid = values.number && values.expiry && values.cvc && values.name;
    setFormValid(isFormValid);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <View style={styles.cardInputContainer}>
        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          labelStyle={styles.cardInputLabel}
          inputStyle={styles.cardInput}
          validColor="black"
          invalidColor="red"
          placeholderColor="darkgray"
          onChange={handleCardInputChange} // Call the validation function on input change
        />
      </View>
      <Text style={styles.itemPrice}>Total Item Price: {itemPrice}</Text>
      <Button
        title="Pay Now"
        onPress={handlePayNow}
        disabled={!formValid} // Disable the button if form is not valid
        color="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  cardInputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  cardInputLabel: {
    color: "black",
    fontSize: 16,
  },
  cardInput: {
    fontSize: 16,
    color: "black",
  },
  itemPrice: {
    fontSize: 18,
    marginBottom: 20,
    color: "gray",
  },
});

export default Payment;
