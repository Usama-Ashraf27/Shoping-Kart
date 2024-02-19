import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { register } from "../../redux/features/auth/userActions";
const isValidEmail = (email) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const PasswordInput = ({
  value,
  onChangeText,
  isVisible,
  toggleVisibility,
}) => (
  <View style={styles.passwordInputContainer}>
    <TextInput
      style={styles.passwordInput}
      placeholder="Password"
      secureTextEntry={!isVisible}
      value={value}
      onChangeText={onChangeText}
    />
    <TouchableOpacity style={styles.eyeIcon} onPress={toggleVisibility}>
      <Icon
        name={isVisible ? "eye" : "eye-slash"}
        size={hp("2%")}
        color="gray"
      />
    </TouchableOpacity>
  </View>
);

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isRegisterButtonDisabled =
    !name ||
    !email ||
    !isValidEmail(email) ||
    !address ||
    !password ||
    !city ||
    !country ||
    !phone ||
    phone.length < 11;

  const handleRegister = () => {
    // Validation
    if (isRegisterButtonDisabled) {
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const userData = {
      name,
      email: trimmedEmail,
      password: trimmedPassword,
      address,
      city,
      country,
      phone,
    };
    dispatch(register(userData, alert));

    navigation.navigate("login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/login/Login.png")}
          style={styles.logo}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(text) => setName(text.trim())}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text.trim())}
        keyboardType="email-address"
      />

      <PasswordInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        isVisible={isPasswordVisible}
        toggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={(text) => setAddress(text.trim())}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        onChangeText={(text) => setCity(text.trim())}
      />

      <TextInput
        style={styles.input}
        placeholder="Country"
        onChangeText={(text) => setCountry(text.trim())}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhone(text.trim())}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[
          styles.registerButton,
          { opacity: isRegisterButtonDisabled ? 0.5 : 1 },
        ]}
        onPress={handleRegister}
        disabled={isRegisterButtonDisabled}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.login}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={styles.loginText}>Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: hp("4%"),
  },
  logo: {
    width: wp("50%"),
    height: hp("11%"),
    resizeMode: "contain",
  },
  input: {
    height: hp("5%"),
    width: wp("80%"),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: wp("5%"),
    marginBottom: hp("2%"),
    paddingHorizontal: wp("3%"),
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("80%"),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: wp("5%"),
    marginBottom: hp("2%"),
    paddingHorizontal: wp("3%"),
  },
  passwordInput: {
    flex: 1,
    height: hp("5%"),
  },
  eyeIcon: {
    paddingLeft: wp("2%"),
  },
  registerButton: {
    backgroundColor: "#DE3163",
    marginTop: hp("2%"),
    width: wp("80"),
    paddingVertical: hp("1.7%"),
    borderRadius: wp("5%"),
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: hp("1.9%"),
  },
  login: {
    flexDirection: "row",
    marginTop: hp("2%"),
  },
  loginText: {
    color: "#DE3163",
    fontWeight: "bold",
  },
});

export default Register;
