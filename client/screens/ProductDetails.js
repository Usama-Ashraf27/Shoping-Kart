import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity ,ScrollView} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Components/Layout/Layout";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetails = ({ route, navigation }) => {
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading to state
  const { productId } = route.params;
  const dispatch = useDispatch();

  // Assuming you have a products slice in your Redux store
  const product = useSelector((state) =>
    state.products.products.find((p) => p._id === productId)
  );

  useEffect(() => {
    // dispatch(fetchProducts()); // Fetch products if not already loaded
  }, [productId]);

  const handleAddQty = () => {
    if (qty === 10) return alert("You can't add more than 10 quantity");
    setQty((prev) => prev + 1);
  };

  const handleRemoveQty = () => {
    if (qty <= 1) return;
    setQty((prev) => prev - 1);
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
  
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      let cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
  
      // Check if the product already exists in the cart
      const existingProductIndex = cartItems.findIndex(item => item._id === product._id);
  
      if (existingProductIndex !== -1) {
        // Product already exists, update the quantity
        cartItems[existingProductIndex].quantity += qty; // Add selected quantity
      } else {
        // Product doesn't exist, add it to the cart with selected quantity
        cartItems.push({ ...product, quantity: qty });
      }
  
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  
      setIsLoading(false);
      alert(`Added ${qty} ${qty > 1 ? 'products' : 'product'} to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Image source={{ uri: product?.images[0]?.url }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{product?.name}</Text>
        <Text style={styles.title}>Price: RS {product?.price} </Text>
        <ScrollView style={styles.descContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.desc}>{product?.description}</Text>
        </ScrollView>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnCart}
            onPress={handleAddToCart}
            disabled={product?.stock <= 0 || isLoading}
          >
            <Text style={styles.btnCartText}>
              {isLoading ? "Adding..." : product?.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
            </Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
              <Text style={styles.btnQtyText}>-</Text>
            </TouchableOpacity>
            <Text>{qty}</Text>
            <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
              <Text style={styles.btnQtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    height: hp("47%"),
    width: wp("100%"),
  },
  container: {
    marginVertical: hp("1.5%"),
    marginHorizontal: wp("2%"),
  },
  title: {
    fontSize: wp("4.5%"),
    textAlign: "left",
  },
  desc: {
    fontSize: wp("3.3%"),
    textTransform: "capitalize",
    textAlign: "justify",
    marginVertical: hp("1%"),
    height: hp("15%")
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp("2%"),
    marginHorizontal: wp("2%"),
  },
  btnCart: {
    width: wp("40%"),
    backgroundColor: "#000000",
    borderRadius: wp("1%"),
    height: hp("6%"),
    justifyContent: "center",
  },
  btnCartText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: wp("3.5%"),
  },
  btnQty: {
    backgroundColor: "lightgray",
    width: wp("12%"),
    alignItems: "center",
    marginHorizontal: wp("2%"),
  }, 
  descContainer: {
    maxHeight: hp("20%"), // Set maximum height for the description
    marginTop: hp("1%"),
  },
  btnQtyText: {
    fontSize: wp("5%"),
  },
});

export default ProductDetails;
