import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/features/auth/userActions";
import Layout from "../../Components/Layout/Layout";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { server } from "../../redux/store";

const Profile = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);
  const [address, setAddress] = useState(userData.address);
  const [city, setCity] = useState(userData.city);
  const [contact, setContact] = useState(userData.phone);
  const [country, setCountry] = useState(userData.country);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${server}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userProfileData = response.data.user; // Extract user data from the response

        // Update local state with the fetched user profile data
        setName(userProfileData.name);
        setEmail(userProfileData.email);
        setPassword(userProfileData.password);
        setAddress(userProfileData.address);
        setCity(userProfileData.city);
        setContact(userProfileData.phone);
        setCountry(userProfileData.country);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Handle error (e.g., show an error message)
        Alert.alert("Error", "Failed to fetch user profile data.");
      }
    };

    // Call the function to fetch user profile when the component mounts
    fetchUserProfile();
  }, [dispatch, token]);

  const handleUpdate = () => {
    setIsLoading(true);
    const updatedUserData = {
      name,
      address,
      city,
      contact,
      country,
    };

    dispatch(updateUser(updatedUserData, token));
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Profile updated successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("account"),
        },
      ]);
    }, 5000);
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.header}>Update Your Profile</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            editable={false}
            placeholder="Email"
          />

          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="City"
          />
          <TextInput
            style={styles.input}
            value={country}
            onChangeText={setCountry}
            placeholder="Country"
          />
          <TextInput
            style={styles.input}
            value={contact}
            onChangeText={setContact}
            placeholder="Contact"
          />
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.updateButtonText}>Update Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp("2%"),
    paddingTop: hp("12%"),
  },
  header: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    marginBottom: hp("3%"),
  },
  input: {
    height: hp("5%"),
    width: wp("80%"),
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: wp("5%"),
    marginTop: hp("2%"),
    paddingHorizontal: wp("3%"),
  },
  updateButton: {
    backgroundColor: "black",
    marginTop: hp("2%"),
    paddingVertical: hp("1.7%"),
    borderRadius: wp("5%"),
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: hp("1.9%"),
  },
});

export default Profile;
