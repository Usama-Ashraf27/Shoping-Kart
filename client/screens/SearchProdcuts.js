import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getnameProduct } from "../redux/features/Product/productActions";
import ProductsCard from "../Components/Products/ProductsCard";

const SearchProdcuts = ({ route }) => {
  const { searchText } = route.params;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getnameProduct(searchText))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, searchText]);

  const renderProductCard = ({ item }) => <ProductsCard p={item} />;
  const data = products.products || [];
  console.log(data,"data")

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Products</Text>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderProductCard}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.row}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    marginTop: 4,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});

export default SearchProdcuts;
