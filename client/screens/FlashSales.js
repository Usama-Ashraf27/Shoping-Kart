import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByCategory } from "../redux/features/category/categoryActions";
import ProductsCard from "../Components/Products/ProductsCard";
import Layout from "../Components/Layout/Layout";

const FlashSales = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const categoryState = useSelector((state) => state.category);
  const categoryId = "65b266858ff536fd0db19e19";

  //   const flashSaleProducts = useMemo(
  //   () => categoryState?.selectedCategoryProductsAsFlash || [],
  //   [categoryState?.selectedCategoryProductsAsFlash]
  // );

  useEffect(() => {
    if (!categoryState?.selectedCategoryProductsAsFlash?.length) {
      dispatch(getProductsByCategory({ setLoading, categoryId }));
    }
  }, [categoryState?.selectedCategoryProductsAsFlash?.length]);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size={25} color="black" />
    </View>
  ) : (
    <Layout>
      <Text style={styles.heading}>Flash Sales</Text>
      <FlatList
        numColumns={2}
        contentContainerStyle={{ paddingBottom: hp(15), marginLeft: 7 }}
        ListEmptyComponent={() => <Text>Products not found</Text>}
        data={categoryState?.selectedCategoryProductsAsFlash}
        renderItem={({ item, index }) => <ProductsCard p={item} />}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    marginVertical: hp("1%"),
  },
});

export default FlashSales;
