import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CommonActions } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const cartItemCount = useSelector((state) => state.order.cartCount);

  const handleLogout = async () => {
    try {
      // await axios
      console.log("click on logout");
      dispatch({ type: "logoutRequest", payload: null });
      dispatch({ type: "getProductsByCategoryEmpty" });
      // await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <AntDesign style={styles.icon} name="home" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Cart")}
      >
        <AntDesign style={styles.icon} name="shoppingcart" />
        {/* {console.log(cartItemCount, "cartItemCount")} */}
        {cartItemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItemCount}</Text>
          </View>
        )}
        <Text style={styles.iconText}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("FlashSales")}
      >
        <AntDesign style={styles.icon} name="tago" />
        <Text style={styles.iconText}>Flash Sales</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("account")}
      >
        <AntDesign style={styles.icon} name="user" />
        <Text style={styles.iconText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuContainer} onPress={handleLogout}>
        <AntDesign style={styles.icon} name="logout" />
        <Text style={styles.iconText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
    color: "#000000",
  },
  iconText: {
    color: "#000000",
    fontSize: 10,
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 20,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Footer;
