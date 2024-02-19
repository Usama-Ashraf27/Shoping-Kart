import React, { useEffect } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getCategory } from "../../redux/features/category/categoryActions";
import CategoryItemProducts from "./CategoryItemProducts";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const CategoryProducts = ({ route }) => {
  const dispatch = useDispatch();
  const categoryId = route.params?.categoryId;
  const categoryState = useSelector((state) => state.category);
  const filteredCategory = categoryState.categories.find((cat) => cat._id === categoryId);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      {filteredCategory ? (
        <View>
          <Text style={styles.categoryName}>{filteredCategory.category}</Text>
          {filteredCategory.products && filteredCategory.products.length > 0 ? (
            <View style={styles.productsContainer}>
              {filteredCategory.products.map((product, index) => (
                <CategoryItemProducts key={product._id} p={product} index={index} />
              ))}
            </View>
          ) : (
            <View style={styles.noProductContainer}>
              <Text style={styles.noProductText}>No products available in this category</Text>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.noCategoryText}>Category not found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: hp("2%"),
  },
  categoryName: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp("1%"),
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: wp("2%"),
  },
  noProductContainer: {
    alignItems: "center",
  },
  noProductText: {
    fontSize: hp("2%"),
    color: "gray",
  },
  noCategoryText: {
    fontSize: hp("2%"),
    color: "red",
    textAlign: "center",
  },
});

export default CategoryProducts;
