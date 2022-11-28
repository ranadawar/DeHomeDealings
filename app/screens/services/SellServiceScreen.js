import {
  StyleSheet,
  Alert,
  View,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";

import TrasparentHeader from "../../components/TrasparentHeader";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../../components/form";

import * as yup from "yup";
import { COLORS } from "../../constants/theme";

import CategoryPickerItem from "../../components/CategoryPickerItem";

import { cities, serviceTypes, areas } from "../../data/store";
import LottieView from "lottie-react-native";
import AppButton from "../../components/AppButton";
import servicecolors from "../../config/servicecolors";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import MainScreen from "../../components/MainScreen";

const postAdInitialValues = {
  title: "",
  description: "",
  address: "",
  total: "",
  userId: "",
  category: null,
  city: null,
  area: null,
  postedTime: "",
  rating: "",
};
const postAdValidationSchema = yup.object().shape({
  title: yup.string().required().min(4).max(35).label("Title"),
  description: yup.string().required().min(15).label("Description"),
  address: yup.string().required().min(10).max(30).label("Address"),
  total: yup.number().required().min(1000).max(1000000000).label("Total"),
  category: yup.object().required().nullable().label("Category"),
  city: yup.object().required().nullable().label("City"),
  area: yup.object().required().nullable().label("Area"),
  userId: yup.string(),
  rating: yup.string(),
  postedTime: "",
});

const SellServiceScreen = ({ navigation }) => {
  const [posted, setPosted] = useState(false);
  const [errorPosted, setErrorPosted] = useState(false);
  const postData = async (values) => {
    console.log("entered");
    const tareekh = new Date().toDateString();

    try {
      setDoc(doc(db, "servicelistings", auth.currentUser.uid), {
        title: values.title,
        description: values.description,
        address: values.address,
        total: values.total,
        category: values.category,
        city: values.city,
        area: values.area,

        userId: auth.currentUser.uid,
        postedTime: tareekh,
        rating: "5",
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
                source={require("../../../assets/svgs/support.png")}
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
                    placeholder="Enter Price"
                    icon="cash-check"
                    name="total"
                    iconColor={COLORS.secondary}
                    keyboardType="number-pad"
                  />
                  <AppFormPicker
                    items={serviceTypes}
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
                source={require("../../animations/done.json")}
                autoPlay
                loop
              />
            </View>
          </>
        )}
        {errorPosted && (
          <>
            <AppButton
              color={servicecolors.five}
              title="Retry"
              onPress={() => setErrorPosted(false)}
            />
            <View style={{ flex: 1 }}>
              <LottieView
                source={require("../../animations/error.json")}
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

export default SellServiceScreen;

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
