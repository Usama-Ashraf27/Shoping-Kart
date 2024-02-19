import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { getCategory } from "../../redux/features/category/categoryActions";
import * as ImagePicker from "expo-image-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../redux/features/Product/productActions";
import { server } from "../../redux/store";
import Axios  from "axios";
import { useNavigation } from "@react-navigation/native";

const EditProductForm = ({ route }) => {
  const navigation = useNavigation();
  const { productId } = route.params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImage] = useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user.token);
  const categoryState = useSelector((state) => state.category.categories);

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(getCategory());

    // Fetch product details based on productId
    const fetchProductDetails = async () => {
      try {
        // Make an API call to get product details
        const response = await fetch(`${server}/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Handle error, for example, show an error message or redirect
          console.error("Failed to fetch product details");
          return;
        }

        // Parse the response
        const productData = await response.json();

        // Log the fetched data
        console.log("Fetched Product Data:", productData);

        // Set the state with the product details
        setName(productData.product.name);
        setDescription(productData.product.description);
        setPrice(String(productData.product.price));
        setStock(String(productData.product.stock));
        setCategory(productData.product.category);


        if (productData.product.images && productData.product.images.length > 0) {
         
          setImage(productData.product.images[0].url);
          
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [dispatch, productId, token]);

  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result.assets[0].uri);
  
      if (!result.canceled) {
        // Fetch the current product details
        const response = await fetch(`${server}/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Handle error, for example, show an error message or redirect
          console.error("Failed to fetch product details");
          return;
        }

        // Parse the response
        const productData = await response.json();
        // Get the ID of the previous image
        const previousImageId = productData.product.images[0]._id;
        console.log('Previous Image ID:', previousImageId);
  
        // Attempt to delete the previous image using its ID
        try {
          const deleteResponse = await Axios.delete(`${server}/product/delete-image/${productId}?id=${previousImageId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          // Check if the delete response indicates success
          if (deleteResponse.data && deleteResponse.data.success) {
            console.log('Previous Image Deleted Successfully');
  
            // Create FormData to send the new image file
            const formData = new FormData();
            formData.append('file', {
              uri: result.assets[0].uri,
              type: 'image/jpeg',
              name: 'image.jpg',
            });
  
            // Hit your API endpoint using Axios to add the new image
            const response = await Axios.put(`${server}/product/image/${productId}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
              },
            });
            setImage(result.assets[0].uri);
            // Check if the response indicates a successful image upload
            
          } 
        } catch (deleteError) {
          console.error('Error deleting previous image:', deleteError);
        }
      }
    } catch (error) {
      console.error('Error selecting/uploading image:', error);
    }
  };
  
  
  
  

  const handleUpdate = async () => {
    try {
      if (!name || !description || !price || !stock || !category) {
        alert("Please provide all details");
        return;
      }
  setIsLoading(true);
      const data = {
        name,
        description,
        price,
        stock,
        category,
      };
  
      await dispatch(updateProduct(productId, data, token));
      
      setTimeout(() =>{
        setIsLoading(false);
alert("Data Updated successfully")
navigation.navigate("ManageProduct")
      },5000)
      
      // console.log(productId, data);
      
      
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>
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
          label: cat.category,
          value: cat._id,
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
        <Text style={styles.imageUploadButtonText}>Change Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        {
          isLoading? (
            <ActivityIndicator color="#fff" />
          ):
        
        <Text style={styles.updateButtonText}>Update</Text>}
      </TouchableOpacity>
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
  updateButton: {
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

export default EditProductForm;
