import React from "react";
import { StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Skeleton = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.headingSkeleton} /> 
      <View style={styles.row}>
      <View style={styles.productContainer}>
        <View style={styles.productImageSkeleton} />
        <View style={styles.productDetails}>
          <View style={styles.productTitleSkeleton} />
          <View style={styles.productDescriptionSkeleton} />
          <View style={styles.productPriceSkeleton} />
        </View>
      </View>
      <View style={styles.productContainer}>
        <View style={styles.productImageSkeleton} />
        <View style={styles.productDetails}>
          <View style={styles.productTitleSkeleton} />
          <View style={styles.productDescriptionSkeleton} />
          <View style={styles.productPriceSkeleton} />
        </View>
      </View></View>
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp("2%"),
    backgroundColor: "#F9F6EE",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingSkeleton: {
    width: wp("50%"),
    height: hp("2.5%"),
    marginTop: hp("1%"),
    borderRadius: wp("1%"),
    backgroundColor: "#CCCCCC",
  },
  productContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: wp("2%"),
    marginVertical: wp("2%"),
    padding: wp("2%"),
    width: wp("63%"),
  },
  productImageSkeleton: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("1%"),
    backgroundColor: "#CCCCCC",
  },
  productDetails: {
    marginLeft: wp("4%"),
  },
  productTitleSkeleton: {
    width: wp("25%"),
    height: hp("2%"),
    borderRadius: wp("1%"),
    backgroundColor: "#CCCCCC",
    marginBottom: hp("1%"),
  },
  productDescriptionSkeleton: {
    width: wp("35%"),
    height: hp("1.5%"),
    borderRadius: wp("1%"),
    backgroundColor: "#CCCCCC",
    marginBottom: hp("1%"),
  },
  productPriceSkeleton: {
    width: wp("20%"),
    height: hp("2%"),
    borderRadius: wp("1%"),
    backgroundColor: "#CCCCCC",
    marginTop: hp("1%"),
  },
});
