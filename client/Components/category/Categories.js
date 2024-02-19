import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getCategory } from "../../redux/features/category/categoryActions";

const Categories = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCategory());
    }, [dispatch])
  );

  const { categories } = categoryState;

  const handleCategoryPress = (categoryId) => {
    navigation.navigate("CategoryProducts", { categoryId });
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category._id}
            style={styles.catContainer}
            onPress={() => handleCategoryPress(category._id)}
          >
            <Text style={styles.catTitle}>{category.category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 5,
    flexDirection: "row",
  },
  catContainer: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  catTitle: {
    fontSize: 12,
  },
});

export default Categories;