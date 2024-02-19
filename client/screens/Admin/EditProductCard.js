import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from "../../redux/features/Product/productActions";

const EditProductCard = ({ p }) => {
  const navigation = useNavigation();
const dispatch = useDispatch();
const [isLoading,setIsLoading] = useState(false);
  const userToken = useSelector((state) => state.user.token); 
  
  // more details btn
  const handleEditButton = (id) => {
    navigation.navigate("EditProductForm", { productId: id });
    // console.log(id);
  };


  const handleDeleteButton = () => {
    setIsLoading(true);
 dispatch(deleteProduct(p._id, userToken));
    setTimeout(() => { 
      setIsLoading(false);
    
    alert("Product deleted successfully");
    },5000)
    
    // Show an alert to confirm deletion
   
  };


  return (
    <View>
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{ uri: p?.images[0]?.url }} />
        <Text style={styles.cardTitle}>{p?.name}</Text>
        <Text style={styles.cardDesc}>
          {p?.description.substring(0, 30)} ...more
        </Text>
        <Text>Rs {p?.price}</Text>
        <View style={styles.BtnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleEditButton(p._id)}
          >
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCart} onPress={handleDeleteButton}>
            {isLoading? (
                    <ActivityIndicator color="#fff" />
            ):(
              <Text style={styles.btnText}>Delete</Text>
            )}
            
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "lightgray",
    marginVertical: hp("1%"),
    marginHorizontal: wp("2%"),
    width: wp("45%"),
    padding: wp("2%"),
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  cardImage: {
    height: hp("15%"),
    width: "100%",
    marginBottom: hp("1%"),
  },
  cardTitle: {
    fontSize: hp("1.5%"),
    fontWeight: "bold",
    marginBottom: hp("0.5%"),
  },
  cardDesc: {
    fontSize: hp("1.5%"),
    textAlign: "left",
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
    backgroundColor: "red",
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

export default EditProductCard;
