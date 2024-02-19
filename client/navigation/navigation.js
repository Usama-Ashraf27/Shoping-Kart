import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Home from "../screens/Home";
import Account from "../screens/Account/Account";
import Profile from "../screens/Account/Profile";
import MyOrder from "../screens/Account/MyOrder";
import Dashboard from "../screens/Admin/Dashboard";
import CreateProduct from "../screens/Admin/CreateProduct";
import CreateCategories from "../screens/Admin/CreateCategories";
import ProductDetails from "../screens/ProductDetails";
import TrendingDetails from "../screens/FlashSales";
import Cart from "../screens/Cart";
import About from "../screens/About";
import Checkout from "../screens/Checkout";
import Payment from "../screens/Payment";
import ManageProduct from "../screens/Admin/ManageProduct";
import EditProduct from "../screens/Admin/EditProductCard";
import EditProductForm from "../screens/Admin/EditProductform";
import ManageOrders from "../screens/Admin/ManageOrders";
import CategoryProducts from "../Components/category/CategoryProducts";
import CategoryItemProducts from "../Components/category/CategoryItemProducts";
import FlashSales from "../screens/FlashSales";
import AdminOrderItems from "../screens/Account/AdminOrderItems";
import Skeleton from "../screens/Skeleton";
import SearchProdcuts from "../screens/SearchProdcuts";
import Trending from "../screens/Trending";
import Footer from "../Components/Layout/Footer";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const token = useSelector((state) => state?.user.token);
  // const data = useSelector((state) =>state?.user)
  console.log(token, "TOKEN");
  // console.log(data,"  data");
  const AuthStack = () => {
    return (
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="account" component={Account} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="myorders" component={MyOrder} />
        <Stack.Screen name="FlashSales" component={FlashSales} />
        <Stack.Screen name="adminPanel" component={Dashboard} />
        <Stack.Screen name="CreateProduct" component={CreateProduct} />
        <Stack.Screen name="AdminOrderItem" component={AdminOrderItems} />
        <Stack.Screen name="CreateCategories" component={CreateCategories} />
        <Stack.Screen name="Footer" component={Footer}/>
        <Stack.Screen name="about" component={About} />
        <Stack.Screen name="productDetails" component={ProductDetails} />
        <Stack.Screen name="Trending" component={Trending}/>
        <Stack.Screen name="TrendingDetails" component={TrendingDetails} />
        <Stack.Screen name="ManageProduct" component={ManageProduct} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="checkout" component={Checkout} />
        <Stack.Screen name="payment" component={Payment} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
        <Stack.Screen name="EditProductForm" component={EditProductForm} />
        <Stack.Screen name="ManageOrders" component={ManageOrders}/>
        <Stack.Screen name="CategoryProducts" component={CategoryProducts}/>
        <Stack.Screen name="CategoryItemProducts" component={CategoryItemProducts}/>
        <Stack.Screen name='Skeleton' component={Skeleton}/>
        <Stack.Screen name='Search' component={SearchProdcuts}/>
      </Stack.Navigator>
    );
  };

  return token ? <HomeStack /> : <AuthStack />;
};

export default AppNavigation;
