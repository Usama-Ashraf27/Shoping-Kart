import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryItemProducts = ({ p }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleMoreButton = (id) => {
    navigation.navigate("productDetails", { productId: id });
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
  
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      let cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
  
      // Check if the product already exists in the cart
      const existingProductIndex = cartItems.findIndex(item => item._id === p._id);
  
      if (existingProductIndex !== -1) {
        // Product already exists, update the quantity
        cartItems[existingProductIndex].quantity += 1;
      } else {
        // Product doesn't exist, add it to the cart
        cartItems.push({ ...p, quantity: 1 });
      }
  
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  
      setIsLoading(false);
      alert('Added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsLoading(false);
    }
  };
  

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{ uri: p?.images[0]?.url }} />
        <Text style={styles.cardTitle}>{p?.name}</Text>
        <Text style={styles.cardDesc}>{p?.description.substring(0, 30)} ...more</Text>
        <Text>Rs {p?.price}</Text>
        <View style={styles.BtnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => handleMoreButton(p._id)}>
            <Text style={styles.btnText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCart} onPress={handleAddToCart}>
            {isLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.btnText}>ADD TO CART</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: wp("46%"), // Adjust the width as needed
    marginBottom: hp("2%"),
  },
  card: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: wp("2%"),
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  cardImage: {
    height: hp("18%"), // Adjust the height as needed to display the full image
    width: "100%",
    resizeMode: "cover",
    borderRadius: wp("2%"), // Optional: Add borderRadius for rounded corners
  },
  cardTitle: {
    fontSize: hp("1.8%"),
    fontWeight: "bold",
    marginBottom: hp("0.5%"),
  },
  cardDesc: {
    fontSize: hp("1.5%"),
    textAlign: "left",
    color: "gray",
  },
  BtnContainer: {
    marginTop: hp("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#000000",
    height: hp("2.5%"),
    width: wp("20%"),
    borderRadius: wp("1%"),
    justifyContent: "center",
  },
  btnCart: {
    backgroundColor: "orange",
    height: hp("2.5%"),
    width: wp("20%"),
    borderRadius: wp("1%"),
    justifyContent: "center",
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: hp("1.5%"),
    fontWeight: "bold",
  },
});

export default CategoryItemProducts;