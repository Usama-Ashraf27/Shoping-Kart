// About.js
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: "https://blog.ubuy.com/wp-content/uploads/2023/03/Empowering-Women-in-E-commerce.webp" }}
        style={styles.image}
      />
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
      Welcome to our E-commerce platform! 🛍️ At Women Kart.pk, we strive to create a delightful shopping experience tailored to the needs and preferences of every customer, especially our valued female shoppers.

Our platform is designed to empower girls and women to explore a wide range of products and services, from fashion and beauty to home decor and lifestyle essentials. We understand the importance of feeling comfortable and confident while shopping online, which is why we've curated a collection of high-quality items that cater to diverse tastes and styles.

Whether you're searching for trendy outfits, skincare products, or unique gifts, you'll find everything you need right here. Our user-friendly interface makes browsing and purchasing items a breeze, with intuitive navigation and helpful features to enhance your shopping journey.

At Women Kart.pk, we prioritize customer satisfaction above all else. Our dedicated team is committed to providing exceptional service and support at every step of the way. If you have any questions or concerns, our knowledgeable staff is always ready to assist you with personalized recommendations and assistance.

Join our community of empowered women who embrace style, creativity, and individuality. Shop with confidence and discover new favorites that reflect your personality and lifestyle. Thank you for choosing Women Kart.pk as your go-to destination for all things fabulous!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: hp("5%"), // Adjusted using heightPercentageToDP
    paddingHorizontal: wp("5%"), // Adjusted using widthPercentageToDP
  },
  image: {
    width: wp("97%"), // Adjusted using widthPercentageToDP
    height: hp("20%"), // Adjusted using heightPercentageToDP
    borderRadius: wp("5%"), // Adjusted using widthPercentageToDP
    marginBottom: hp("4%"), // Adjusted using heightPercentageToDP
  },
  title: {
    fontSize: wp("8%"), // Adjusted using widthPercentageToDP
    fontWeight: "bold",
    marginBottom: hp("2%"), // Adjusted using heightPercentageToDP
  },
  description: {
    fontSize: wp("4%"), // Adjusted using widthPercentageToDP
    textAlign: "center",
  },
});

export default About;
