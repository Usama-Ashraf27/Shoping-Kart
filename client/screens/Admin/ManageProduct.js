import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import ProductsCard from "../../Components/Products/ProductsCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/features/Product/productActions";
import EditProductCard from "./EditProductCard";
import { useFocusEffect } from '@react-navigation/native';

const ManageProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchProducts());
    }, [dispatch])
  );

  const productsChunks = chunkArray(products.products || [], 2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {productsChunks.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((p, index) => (
            <EditProductCard key={p._id} p={p} index={index} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const chunkArray = (array, chunkSize) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});

export default ManageProduct;
