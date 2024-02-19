import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Redux hooks
import { login } from "../../redux/features/auth/userActions";
import { useDispatch } from "react-redux";

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

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        showAlertBeforeExit();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  const showAlertBeforeExit = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to close the app?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Exit",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
  };
  // Validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle login logic
  const handleLogin = async () => {
    try {
      // Trim and lowercase email
      const trimmedEmail = email.trim().toLowerCase();

      // Validation
      if (!isValidEmail(trimmedEmail)) {
        console.log("Invalid email address");
        return;
      }

      // Dispatch login action
      dispatch(login(trimmedEmail, password, alert));
      // console.log("Login Response:", response);

      // navigation.navigate("Home");
    } catch (error) {
      // Handle login errors
      console.error("Login failed:", error);
      if (error.response && error.response.status === 500) {
        alert("An internal server error occurred. Please try again later.");
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/login/Login.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          isVisible={isPasswordVisible}
          toggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
        />
        <TouchableOpacity
          style={[
            styles.loginButton,
            {
              opacity: email.trim() !== "" && password.trim() !== "" ? 1 : 0.5,
            },
          ]}
          onPress={handleLogin}
          disabled={email.trim() === "" || password.trim() === ""}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text>Don't have an Account? </Text>
          <Text
            style={styles.signuptext}
            onPress={() => {
              navigation.navigate("register");
            }}
          >
            Sign Up{" "}
          </Text>
        </View>
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
  formContainer: {
    width: wp("80%"),
  },
  label: {
    fontSize: hp("2%"),
    marginBottom: hp("1%"),
    fontWeight: "bold",
  },

  input: {
    height: hp("5%"),
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
  loginButton: {
    backgroundColor: "#DE3163",
    marginTop: hp("2%"),
    paddingVertical: hp("1.7%"),
    borderRadius: wp("5%"),
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: hp("1.9%"),
  },
  signup: {
    flexDirection: "row",
    marginTop: hp("2%"),
    justifyContent: "center",
  },
  signuptext: {
    color: "#DE3163",
    fontWeight: "bold",
  },
});

export default Login;
