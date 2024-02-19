import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";

const CartItem = ({ item, onDelete, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(
    item.quantity ? item.quantity.toString() : "1"
  );

  const handleDelete = async () => {
    const existingCartItems = await AsyncStorage.getItem("cartItems");
    const parsedCartItems = existingCartItems
      ? JSON.parse(existingCartItems)
      : [];

    const updatedCartItems = parsedCartItems.filter(
      (cartItem) => cartItem._id !== item._id
    );

    await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    onDelete();
  };

  const handleUpdateQuantity = async (newQuantity) => {
    setQuantity(newQuantity.toString());

    // Notify the parent component about the quantity change
    onUpdateQuantity(item._id, newQuantity);
  };

  const handleIncrement = () => {
    const newQuantity = parseInt(quantity, 10) + 1;
    handleUpdateQuantity(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(parseInt(quantity, 10) - 1, 1);
    handleUpdateQuantity(newQuantity);
  };

  return (
    <View style={styles.cartItem}>
      <Image
        style={styles.cartItemImage}
        source={{ uri: item?.images[0]?.url }}
      />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle}>{item?.name}</Text>
        <Text style={styles.cartItemPrice}>{`Rs ${item?.price}`}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleDecrement}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.quantityInput}
          value={quantity}
          onChangeText={setQuantity}
          onBlur={() => handleUpdateQuantity(parseInt(quantity, 10))}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleIncrement}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Icon name="trash" size={17} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "black",
    padding: 4,
    borderRadius: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  cartItemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "gray",
  },
  quantityInput: {
    width: 50,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    textAlign: "center",
    marginHorizontal: 10,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: "black",
    borderRadius: 5,
    justifyContent: "center", // Center the icon vertically
    alignItems: "center", // Center the icon horizontally
  },
  deleteButtonText: {
    color: "white",
  },
});

export default CartItem;
