import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PriceTable from "../Components/Cart/PriceTable";
import Layout from "../Components/Layout/Layout";
import CartItem from "../Components/Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";

const Cart = ({ navigation, parsedCartItems }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const fetchCartItems = async () => {
    try {
      const existingCartItems = await AsyncStorage.getItem("cartItems");
      const parsedCartItems = existingCartItems
        ? JSON.parse(existingCartItems)
        : [];
      setCartItems(parsedCartItems);
      dispatch({
        type: "setCartCountRequest",
        payload: parsedCartItems?.length,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.price * (item.quantity || 0);
      return total + itemTotal;
    }, 0);
  };

  const calculateGrandTotal = () => {
    const total = calculateTotal();
    const shippingCharges = 150;
    return total + shippingCharges;
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDeleteItem = async () => {
    const existingCartItems = await AsyncStorage.getItem("cartItems");
    const parsedCartItems = existingCartItems
      ? JSON.parse(existingCartItems)
      : [];
    setCartItems(parsedCartItems);
    fetchCartItems();
  };

  const totalAmountNumber = parseFloat(calculateGrandTotal());

  const handleCheckout = () => {
    const totalAmounts = parseFloat(calculateTotal(cartItems));
    const shippingCharges = 150;
    navigation.navigate("checkout", {
      cartItems,
      totalAmounts: totalAmountNumber,
      shippingCharges,
    });
  };

  return (
    <Layout>
      <Text
        style={[
          styles.heading,
          cartItems.length === 0 ? styles.emptyCart : null,
        ]}
      >
        {cartItems?.length > 0
          ? `You have ${cartItems.length} Items Left In Your Cart`
          : "Oops Your Cart is Empty"}
      </Text>
      {cartItems?.length > 0 && (
        <>
          {cartItems.map((item, index) => (
            <CartItem
              key={`${item._id}-${index}`}
              item={item}
              onDelete={handleDeleteItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
          <PriceTable title={"Price"} price={calculateTotal()} />
          <PriceTable title={"Shipping"} price={150} />
          <View style={styles.grandTotal}>
            <PriceTable title={"Total"} price={calculateGrandTotal()} />
          </View>
          <TouchableOpacity style={styles.btn} onPress={handleCheckout}>
            <Text style={styles.btntext}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    
  },
  heading: {
    textAlign: "center",
    marginTop: 10,
  },
  emptyCart: {
    color: "red",
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "LightGray",
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  btn: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "black",
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btntext: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Cart;
