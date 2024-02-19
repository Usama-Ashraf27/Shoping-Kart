import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Layout from "../Components/Layout/Layout";
import Categories from "../Components/category/Categories";
import Header from "../Components/Layout/Header";
import Banner from "../Components/Banner/Banner";
import Products from "../Components/Products/Products";
import Trending from "./Trending";

const Home = ({ navigation }) => {
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header navigation={navigation} />
        <Categories navigation={navigation} />
        <Banner navigation={navigation} />
        <Trending navigation={navigation} />
        <View style={styles.lengthp}>
          <Products navigation={navigation} />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {},
  lengthp: {
    width: "100%",

    paddingBottom: "15%",
  },
});

export default Home;
