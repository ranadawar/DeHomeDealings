import {
  StyleSheet,
  Alert,
  View,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";

import LottieView from "lottie-react-native";
import TrasparentHeader from "../components/TrasparentHeader";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/form";

import * as yup from "yup";
import { COLORS } from "../constants/theme";

import CategoryPickerItem from "../components/CategoryPickerItem";

import { propertyTypes, cities, dealCategories, areas } from "../data/store";
import AppButton from "../components/AppButton";
import servicecolors from "../config/servicecolors";
import MainScreen from "../components/MainScreen";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { randomString } from "../global/functions";

const postAdInitialValues = {
  title: "",
  description: "",
  address: "",
  total: "",
  bedrooms: "",
  bathrooms: "",
  user: null,
  size: "",
  image: "",
  category: null,
  city: null,
  area: null,
  propertyType: null,
  postedTime: "",
  rating: "",
  phone: "",
};
const postAdValidationSchema = yup.object().shape({
  title: yup.string().required().min(4).max(35).label("Title"),
  description: yup.string().required().min(15).label("Description"),
  address: yup.string().required().min(10).max(30).label("Address"),
  total: yup.number().required().min(1000).max(1000000000).label("Total"),
  size: yup.number().required().min(1).max(1000).label("Size"),
  bedrooms: yup.number().required().min(1).max(10).label("Bedrooms"),
  bathrooms: yup.number().required().min(1).max(10).label("Bathrooms"),
  category: yup.object().required().nullable().label("Category"),
  city: yup.object().required().nullable().label("City"),
  area: yup.object().required().nullable().label("Area"),
  propertyType: yup.object().required().nullable().label("Property Type"),
  userId: yup.string(),
  image: yup.string(),
  rating: yup.string(),
  phone: yup.string(),
});

const ListingEditScreen = ({ navigation }) => {
  const [posted, setPosted] = useState(false);
  const [errorPosted, setErrorPosted] = useState(false);
  const postData = async (values) => {
    console.log("entered");
    const tareekh = new Date().toDateString();
    const phoneNumber = auth.currentUser.phoneNumber;
    const docId = randomString(25);

    try {
      console.log("hello");
      setDoc(doc(db, "listings", docId), {
        title: values.title,
        description: values.description,
        address: values.address,
        listingId: docId,
        total: values.total,
        size: values.size,
        bedrooms: values.bedrooms,
        bathrooms: values.bathrooms,
        propertyType: values.propertyType,
        category: values.category,
        city: values.city,
        area: values.area,
        image:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

        userId: auth.currentUser.uid,
        postedTime: tareekh,
        rating: "5",
        phone: phoneNumber,
      });
      setPosted(true);
    } catch (error) {
      Alert.alert("Error", error.message);
      setErrorPosted(true);
    }
  };
  return (
    <>
      <MainScreen>
        <View style={styles.mainContainer}>
          <TrasparentHeader
            title="Post Ad"
            onPress={() => navigation.goBack()}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.scrolling}>
              <Image
                source={require("../../assets/svgs/posthome.png")}
                style={styles.imageTop}
                resizeMode="contain"
              />
              <View style={styles.formContainer}>
                <AppForm
                  initialValues={postAdInitialValues}
                  validationSchema={postAdValidationSchema}
                  onSubmit={(values) => postData(values)}
                >
                  <AppFormField
                    placeholder="Enter Title"
                    icon="text"
                    name="title"
                    iconColor={COLORS.secondary}
                    keyboardType="email-address"
                  />
                  <AppFormField
                    placeholder="Enter Description"
                    icon="details"
                    name="description"
                    iconColor={COLORS.secondary}
                    keyboardType="email-address"
                    multiline
                    numberOfLines={3}
                  />
                  <AppFormField
                    placeholder="Street#/Street Name"
                    icon="google-maps"
                    name="address"
                    iconColor={COLORS.secondary}
                  />
                  <AppFormField
                    placeholder="Enter Total Price"
                    icon="cash-check"
                    name="total"
                    iconColor={COLORS.secondary}
                    keyboardType="number-pad"
                  />
                  <AppFormField
                    placeholder="Enter area size in Marla"
                    icon="move-resize"
                    name="size"
                    iconColor={COLORS.secondary}
                    keyboardType="number-pad"
                  />
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Enter Number of Rooms"
                    icon="bed-double-outline"
                    name="bedrooms"
                    iconColor={COLORS.secondary}
                    keyboardType="number-pad"
                  />
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Enter Number of Bathrooms"
                    icon="bathtub-outline"
                    name="bathrooms"
                    iconColor={COLORS.secondary}
                    keyboardType="number-pad"
                  />
                  <AppFormPicker
                    items={propertyTypes}
                    name="propertyType"
                    placeholder="Property Type"
                    PickerItemComponent={CategoryPickerItem}
                    numOfColumns={3}
                  />
                  <AppFormPicker
                    items={dealCategories}
                    name="category"
                    placeholder="Purpose"
                    PickerItemComponent={CategoryPickerItem}
                    numOfColumns={3}
                  />
                  <AppFormPicker
                    items={cities}
                    name="city"
                    placeholder="Select City"
                    PickerItemComponent={CategoryPickerItem}
                    numOfColumns={3}
                  />
                  <AppFormPicker
                    items={areas}
                    name="area"
                    placeholder="Select Area"
                  />

                  <SubmitButton title="Post" />
                </AppForm>
              </View>
            </View>
          </ScrollView>
        </View>
      </MainScreen>
      <Modal visible={posted} animationType="slide">
        {posted && (
          <>
            <AppButton
              color={servicecolors.five}
              title="Go Back"
              onPress={() => {
                setPosted(false);
              }}
            />
            <View style={{ flex: 1 }}>
              <LottieView
                source={require("../animations/done.json")}
                autoPlay
                loop
              />
            </View>
          </>
        )}
        {!posted && (
          <>
            <AppButton
              color={servicecolors.five}
              title="Retry"
              onPress={() => setErrorPosted(false)}
            />
            <View style={{ flex: 1 }}>
              <LottieView
                source={require("../animations/error.json")}
                autoPlay
                loop
              />
            </View>
          </>
        )}
      </Modal>
    </>
  );
};

export default ListingEditScreen;

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 30,
  },
  imageTop: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  mainContainer: {
    flex: 1,
  },
  scrolling: {
    flex: 1,
    alignItems: "center",
    paddingRight: 20,
  },
});
