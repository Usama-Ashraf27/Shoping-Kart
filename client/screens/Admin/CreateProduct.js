import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  getCategory,
  getProductsByCategory,
} from "../../redux/features/category/categoryActions";
import * as ImagePicker from "expo-image-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/features/Product/productActions";

const CreateProduct = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImage] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user.token);
  const categoryState = useSelector((state) => state.category.categories);
  const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(getCategory());
  }, [dispatch]);

  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      // Perform client-side validation
      if (!name || !description || !price || !stock || !images ) {
        alert(` Please provide All details`);
        return;
      }

      // Ensure category state is set before continuing
      // await new Promise((resolve) => {
      //   setCategory((currentCategory) => {
      //     if (currentCategory) {
      //       resolve();
      //     } else {
      //       setTimeout(() => resolve(), 100);
      //     }
      //     return currentCategory;
      //   });
      // });

      const formData = new FormData();
      formData.append("file", {
        uri: images,
        type: "image/jpeg",
        name: "image.jpg",
      });

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
  dispatch(createProduct({ formData, token, onSuccess: getList }));
      // Dispatch your action
      setTimeout(()=>{
        setIsLoading(false);
alert("Product created successfully");
      navigation.navigate("adminPanel");
      },5000)
    
      
    } catch (error) {
      console.error("Error handling upload:", error);
    }
  };

  const getList = useCallback(() => {
    dispatch(getProductsByCategory({ categoryId: category }));
  }, [category, dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        borderRadius={10}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        borderRadius={10}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        borderRadius={10}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
        borderRadius={10}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categoryState.map((cat) => ({
          label: cat?.category || "Category Not Available",
          value: cat?._id || "No ID",
        }))}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder="Select Category"
        searchPlaceholder="Search..."
        value={category}
        onChange={(item) => setCategory(item.value)}
      />
      {images && <Image source={{ uri: images }} style={styles.image} />}
      <TouchableOpacity
        style={styles.imageUploadButton}
        onPress={handleImageUpload}
      >
        <Text style={styles.imageUploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        {isLoading ? (
              <ActivityIndicator color="#fff" />):(
        <Text style={styles.uploadButtonText}>Upload</Text>
        )}</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp("5%"),
    alignItems: "center",
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
  },
  input: {
    height: hp("5%"),
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: hp("2%"),
    paddingHorizontal: wp("2%"),
    width: wp("80%"),
  },
  image: {
    width: wp("80%"),
    height: hp("30%"),
    marginBottom: hp("2%"),
  },
  imageUploadButton: {
    backgroundColor: "#DE3163",
    paddingVertical: hp("1.7%"),
    borderRadius: wp("5%"),
    alignItems: "center",
    marginBottom: hp("2%"),
    width: wp("80%"),
  },
  imageUploadButtonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: hp("1.9%"),
  },
  uploadButton: {
    backgroundColor: "#DE3163",
    paddingVertical: hp("1.7%"),
    borderRadius: wp("5%"),
    alignItems: "center",
    width: wp("80%"),
  },
  uploadButtonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: hp("1.9%"),
  },
  dropdown: {
    margin: wp("4%"),
    height: hp("6%"),
    width: wp("80%"),
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: hp("2%"),
  },
  selectedTextStyle: {
    fontSize: hp("2%"),
  },
  iconStyle: {
    width: wp("5%"),
    height: hp("3%"),
  },
  inputSearchStyle: {
    height: hp("5%"),
    fontSize: hp("2%"),
  },
});

export default CreateProduct;
