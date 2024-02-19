import { StyleSheet, View } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const SkeletonProduct = () => {
  return (<>
     <View style={styles.header}></View>
    <View style={styles.container}>
     
      {/* First Skeleton */}
      <View style={styles.skeletonContainer}>
        <View style={styles.imageContainer}>
          {/* Image placeholder */}
          <View style={styles.imageSkeleton} />
        </View>
        <View style={styles.info}>
          {/* Description placeholder */}
          <View style={styles.name} />
          <View style={styles.descriptionSkeleton} />

          {/* Price placeholder */}
          <View style={styles.priceSkeleton} />
          <View style={styles.buttonContainer}>
            <View style={styles.button}></View>
            <View style={styles.button}></View>
          </View>
        </View>
      </View>

      {/* Second Skeleton */}
      <View style={styles.skeletonContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imageSkeleton} />
        </View>
        <View style={styles.info}>
        <View style={styles.name} />
          <View style={styles.descriptionSkeleton} />
          <View style={styles.priceSkeleton} />
          <View style={styles.buttonContainer}>
            <View style={styles.button}></View>
            <View style={styles.button}></View>
          </View>
        </View>
      </View>
    </View></>
  );
};

export default SkeletonProduct;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("2%"),
  },
  header:{
    height: hp("3%"),
    width: "45%",
    backgroundColor: "#CCCCCC",
  },
  skeletonContainer: {
    borderWidth: 1,
    borderColor: "lightgray",
    marginVertical: hp("1%"),
    marginHorizontal: wp("2%"),
    width: wp("45%"),
    padding: wp("2%"),
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  name:{
    height: hp("1.5%"),
    width: "50%",
    backgroundColor: "#CCCCCC",
    marginBottom: hp("0.5%"),
  },
  imageContainer: {
    height: hp("15%"),
    width: "100%",
    marginBottom: hp("1%"),
  },
  imageSkeleton: {
    backgroundColor: "#CCCCCC",
    height: "100%",
    width: "100%",
  },
  info: {
    marginBottom: hp("1%"),
  },
  descriptionSkeleton: {
    height: hp("1.5%"),
    width: "80%",
    backgroundColor: "#CCCCCC",
    marginBottom: hp("0.5%"),
  },
  priceSkeleton: {
    height: hp("1.5%"),
    width: "35%",
    backgroundColor: "#CCCCCC",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("1%"),
  },
  button: {
    backgroundColor: "#000000",
    height: hp("2.5%"),
    width: wp("20%"),
    borderRadius: wp("1%"),
    justifyContent: "center",
  },
});
