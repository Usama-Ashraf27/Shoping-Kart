import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByCategory } from "../redux/features/category/categoryActions";
import Skeleton from "./Skeleton";

const Trending = ({ navigation }) => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category);
  const [isLoading, setIsLoading] = useState(false);
  const categoryId = "65afe2d4865addd71567d4de";

  useEffect(() => {
    if (!categoryState?.selectedCategoryProductsAsTrending?.length) {
      dispatch(getProductsByCategory({ setLoading: setIsLoading, categoryId }));
    }
  }, [categoryState?.selectedCategoryProductsAsTrending?.length]);

  // console.log(categoryState?.selectedCategoryProductsAsTrending?.length);

  // const truncateDescription = (text, limit) => {
  //   if (text.split(" ")?.length > limit) {
  //     return text.split(" ").slice(0, limit).join(" ") + "...";
  //   } else {
  //     return text;
  //   }
  // };

  const handleCategoryPress = (categoryId) => {
    navigation.navigate("CategoryProducts", { categoryId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item.category)}>
      <View style={styles.productContainer}>
        <Image
          source={{ uri: item?.images[0]?.url }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item?.name}</Text>
          <Text numberOfLines={1} style={styles.productDescription}>
            {item?.description}
          </Text>
          <Text style={styles.productPrice}>{`Rs ${item?.price}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return isLoading ? (
    <Skeleton />
  ) : (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Trending Products</Text>
        <FlatList
          data={categoryState?.selectedCategoryProductsAsTrending}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp("2%"),
    backgroundColor: "#F9F6EE",
    marginTop: 10,
  },
  heading: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    marginVertical: hp("1%"),
  },
  productContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: wp("2%"),
    margin: wp("2%"),
    padding: wp("2%"),
    width: wp("60%"),
  },
  productImage: {
    width: wp("20%"),
    height: wp("20%"),
    resizeMode: "cover",
    borderRadius: wp("1%"),
  },
  productDetails: {
    marginLeft: wp("4%"),
  },
  productTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: hp("1.5%"),
    color: "gray",
    width: "60%",
  },
  productPrice: {
    fontSize: hp("2%"),
    color: "green",
    marginTop: hp("1%"),
  },
});

export default Trending;
