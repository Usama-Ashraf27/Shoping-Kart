import { View, Text, ScrollView, Image, StyleSheet ,TouchableOpacity} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Layout from "../../Components/Layout/Layout";
import { useNavigation } from "@react-navigation/native";

const TrendingProduct = () => {
  const truncateDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return description;
  };
  const navigation = useNavigation();

  const handleMoreButton = (id) => {
    alert("Under Working");
    // navigation.navigate("trendingProducts", { _id: id });
  };

  const handleAddToCart = async () => {
    try {
      // Show loading indicator
      setIsLoading(true);

      // Simulate a delay for demonstration purposes (remove this in production)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Retrieve existing cart items from AsyncStorage
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      const cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];

      // Add the new item to the cart
      cartItems.push(p);

      // Save the updated cart items to AsyncStorage
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Hide loading indicator
      setIsLoading(false);

      alert('Added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);

      // Hide loading indicator on error
      setIsLoading(false);
    }
  };
  

  return (
    
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    {trendingProducts.map((p, index) => (
      <View key={index} style={styles.productContainer}>
        <Image source={{ uri: p.imageUrl }} style={styles.productImage} />
        <Text style={styles.productName}>{p.name}</Text>
        <Text style={styles.productDescription}>
          {truncateDescription(p.description, 10)}
        </Text>
        
        <Text style={styles.productPrice}>RS{p.price}</Text>
        <View style={styles.BtnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleMoreButton(p._id)}
          >
            <Text style={styles.btnText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCart} onPress={handleAddToCart}>
            <Text style={styles.btnText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    ))}
  </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: wp("2%"), // Adjust the padding using wp
  },
  productContainer: {
    width: wp("48%"), // Use wp to set width as a percentage of the screen width
    height: hp("40%"), // Use hp to set height as a percentage of the screen height
    marginBottom: hp("2%"), // Use hp for margin
    borderWidth: 1,
    borderColor: "#ccc",
    padding: wp("2%"), // Adjust padding using wp
  },
  productImage: {
    width: wp("44%"), // Use wp for width
    height: hp("20%"), // Use hp for height
    resizeMode: "cover",
    marginBottom: hp("1%"), // Use hp for margin
  },
  productDescription: {
    fontSize: 12,
    textAlign: "left",
    marginBottom: 5,
  },
  productName: {
    fontWeight: "bold",
  },
  productPrice: {
    fontWeight: "bold",
    color: "green",
  },
  BtnContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#000000",
    height: 20,
    width: "45%",
    borderRadius: 5,
    justifyContent: "center",
  },
  btnCart: {
    backgroundColor: "orange",
    height: 20,
    width: "45%",
    borderRadius: 5,
    justifyContent: "center",
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default TrendingProduct;