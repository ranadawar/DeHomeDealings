import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../../constants/theme";
import { AppForm, AppFormField, SubmitButton } from "../../components/form";

import * as yup from "yup";

const UpdateProfile = () => {
  const navigation = useNavigation();

  const validationSchema = yup.object().shape({
    userName: yup.string().required().min(5).max(12).label("Name"),
    phoneNumber: yup
      .string()
      .required()
      .min(11, "Phone number must be 11 digits")
      .label("Phone Number"),
    cnic: yup
      .string()
      .required()
      .min(13, "CNIC must be 13 digits")
      .label("CNIC"),
    address: yup.string().required().min(5).max(12).label("Address"),
  });

  return (
    <MainScreen>
      <View style={styles.container}>
        <AppHeader
          titleScreen="Update Profile"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.topContainer}>
          <Image
            resizeMode="contain"
            source={require("../../../assets/icons/update.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Update Profile</Text>
        </View>

        <View style={styles.formContainer}>
          <AppForm
            initialValues={{
              userName: "",
              phoneNumber: "",
              cnic: "",
              address: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
          >
            <AppFormField placeholder="Updated User Name" name="userName" />
            <AppFormField
              placeholder="Updated Phone Number"
              name="phoneNumber"
            />
            <AppFormField placeholder="Updated Address " name="address" />
            <AppFormField placeholder="Updated CNIC " name="cnic" />
            <SubmitButton title="Update Profile" />
          </AppForm>
        </View>
      </View>
    </MainScreen>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    width: 135,
    height: 135,
  },
  topContainer: {
    marginVertical: 25,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginTop: 12,
    color: COLORS.primary,
  },
});
