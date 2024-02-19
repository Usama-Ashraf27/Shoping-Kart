import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Layout from "../../Components/Layout/Layout";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import makeupImage from "../../assets/make-up.png";
import { server } from "../../redux/store";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const Account = ({ navigation }) => {
  const route = useRoute();
  const [userProfileData, setUserProfileData] = useState(null);
  const [image, setImage] = useState(null); // Define the setImage function
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const handleLogout = async () => {
    try {
      
      console.log(token)
     
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserProfileData(response.data.user);
    } catch (error) {
      console.error("Error fetching user profile data:", error);
    }
  };

  const handleAdminPanel = () => {
    if (userProfileData && userProfileData.role === "admin") {
      navigation.navigate("adminPanel", { id: userProfileData._id });
    } else {
      alert("Only admin can access the Admin Panel.");
    }
  };

  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        const formData = new FormData();
        formData.append("profilePic", {  // Ensure the field name matches
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: "profilePic.jpg",
        });
  
        await axios.put(`${server}/user/update-profilepic`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
  
        
        fetchData();
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      alert("Error", "Failed to select image.");
    }
  };
  

  return (
    <Layout>
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={handleImageUpload}>
          <Image source={userProfileData?.profilePic?.url ? { uri: userProfileData.profilePic.url } : makeupImage} style={styles.image} />
        </TouchableOpacity> */}
        {userProfileData && (
          <>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.name}>
                Hi
                <Text style={{ color: "green" }}> {userProfileData.name}</Text>
                👋
              </Text>
              <Text>Email : {userProfileData.email}</Text>
              <Text>Contact : {userProfileData.phone}</Text>
            </View>
          </>
        )}
        <View style={styles.btnContainer}>
          <Text style={styles.heading}>Account Setting</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("profile", { id: userProfileData?._id })}
          >
            <AntDesign style={styles.btnText} name="edit" />
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("myorders", { id: userProfileData?._id })}
          >
            <AntDesign style={styles.btnText} name="bars" />
            <Text style={styles.btnText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={handleAdminPanel}
          >
            <AntDesign style={styles.btnText} name="windows" />
            <Text style={styles.btnText}>Admin Panel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("about")}
          >
            <AntDesign style={styles.btnText} name="info" />
            <Text style={styles.btnText}>About</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
        onPress={handleLogout}
      >
        <AntDesign
          style={styles.icon}
          name="logout"
        />
        <Text
          style={styles.iconText}
        >
          Log Out
        </Text>
      </TouchableOpacity> */}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp("2%"),
    marginTop: hp("7.5%"),
  },
  image: {
    height: hp("15%"),
    width: wp("100%"),
    resizeMode: "contain",
  },
  name: {
    marginTop: hp("1%"),
    fontSize: hp("4%"),
  },
  btnContainer: {
    padding: hp("1%"),
    backgroundColor: "#ffffff",
    margin: hp("1%"),
    marginVertical: hp("2%"),
    elevation: 5,
    borderRadius: hp("1%"),
    paddingBottom: hp("3%"),
  },
  heading: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    paddingBottom: hp("1%"),
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp("1%"),
    padding: hp("0.5%"),
  },
  btnText: {
    fontSize: hp("2.1%"),
    marginRight: hp("1%"),
  },
});

export default Account;
