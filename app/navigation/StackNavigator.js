import { StyleSheet } from "react-native";
import React from "react";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import PayementsScreen from "../screens/PayementsScreen";

import RecommendedScreen from "../screens/RecommendedScreen";
import DrawerNavigator from "./DrawerNavigator";
import UserVerificationScreen from "../screens/UserVerificationScreen";
import AgreementScreen from "../screens/AgreementScreen";
import ListingsScreen from "../screens/ListingsScreen";
import SellServiceScreen from "../screens/services/SellServiceScreen";
import MyListings from "../screens/userscreens/MyListings";
import ServicesHome from "../screens/services/ServicesHome";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllServices from "../screens/services/AllServices";
import Slistings from "../screens/services/Slistings";
import ServicesDetailsScreen from "../screens/services/ServicesDetailsScreen";
import ReportProblemScreen from "../screens/ReportProblemScreen";
import AgreementDetailScreen from "../screens/AgreementDetailScreen";
import InboxScreen from "../screens/InboxScreen";
import AddBankAccountNumber from "../screens/paymentScreens/AddBankAccountNumber";
import ServiceListingDetails from "../screens/services/ServiceListingDetails";
import QrCodeScanner from "../screens/QrCodeScanner";
import QrCodeListingDetails from "../screens/QrCodeListingDetails";
import UpdateProfile from "../screens/userscreens/UpdateProfile";
import SendOfferScreen from "../screens/SendOfferScreen";
import ViewMyHomeOffers from "../screens/ViewMyHomeOffers";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="Details" component={ListingDetailsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="payment" component={PayementsScreen} />
      <Stack.Screen name="foryou" component={RecommendedScreen} />
      <Stack.Screen name="Verify" component={UserVerificationScreen} />
      <Stack.Screen name="Agreement" component={AgreementScreen} />
      <Stack.Screen name="preview" component={AgreementDetailScreen} />
      <Stack.Screen name="Listings" component={ListingsScreen} />
      <Stack.Screen name="Mylisting" component={MyListings} />
      <Stack.Screen name="inbox" component={InboxScreen} />
      <Stack.Screen name="qrcodescanner" component={QrCodeScanner} />
      <Stack.Screen name="qrDetails" component={QrCodeListingDetails} />

      <Stack.Screen name="report" component={ReportProblemScreen} />

      <Stack.Screen name="services" component={ServicesHome} />
      <Stack.Screen name="allservices" component={AllServices} />
      <Stack.Screen name="Selling" component={SellServiceScreen} />
      <Stack.Screen name="slistings" component={Slistings} />
      <Stack.Screen name="sdetails" component={ServicesDetailsScreen} />
      <Stack.Screen name="updateprofile" component={UpdateProfile} />
      <Stack.Screen
        name="servicelistingdetails"
        component={ServiceListingDetails}
      />

      <Stack.Screen name="bankaccountnumber" component={AddBankAccountNumber} />
      <Stack.Screen name="sendofferhome" component={SendOfferScreen} />

      <Stack.Screen name="viewmyhomeoffers" component={ViewMyHomeOffers} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
