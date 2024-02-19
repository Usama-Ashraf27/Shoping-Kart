import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from "react-native";
import ProductsCard from "./ProductsCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/features/Product/productActions";
import SkeletonProduct from "../../screens/SkeletonProduct";
import { useFocusEffect } from "@react-navigation/native";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);

  const fetchProductsData = () => {
    setLoading(true);
    dispatch(fetchProducts())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProductsData();
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      fetchProductsData();
    }, [])
  );

  const productsChunks = chunkArray(products.products || [], 2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
       <SkeletonProduct />
      ) : (
        <>
        
          <Text style={styles.heading}>All Products</Text>
          {productsChunks.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((p, index) => (
                <ProductsCard key={p._id} p={p} index={index} />
              ))}
            </View>
          ))}
        </>
      )}
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
    marginTop: 4,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});

export default Products;
