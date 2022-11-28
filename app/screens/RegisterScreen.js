import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React from "react";
import AppButton from "../components/AppButton";
import { COLORS } from "../constants/theme";

import { AppForm, AppFormField, SubmitButton } from "../components/form";

import * as yup from "yup";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const signUpValidationSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().min(5).max(12).label("Password"),
  username: yup.string().required().min(5).max(12).label("Username"),
  phoneNumber: yup
    .string()
    .required()
    .min(11, "Phone number must be 11 digits")
    .label("Phone Number"),
});

const RegisterScreen = ({ navigation }) => {
  const handleSignUp = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          username: values.username,
          email: values.email,
          phoneNumber: values.phoneNumber,
          uid: user.uid,
        }).then(() => {
          console.log("User added!");
        });
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/basic/landingLogo.png")}
        />
        <Text
          style={{ fontSize: 25, fontWeight: "bold", color: COLORS.primary }}
        >
          Register
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <AppForm
          initialValues={{ email: "", password: "" }}
          validationSchema={signUpValidationSchema}
          onSubmit={(values) => handleSignUp(values)}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter Email"
            icon="email"
            name="email"
            iconColor={COLORS.secondary}
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter Username"
            icon="human-greeting-variant"
            name="username"
            iconColor={COLORS.secondary}
            keyboardType="email-address"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter phone number"
            icon="card-account-phone-outline"
            name="phoneNumber"
            iconColor={COLORS.secondary}
            keyboardType="number-pad"
          />

          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter Password"
            icon="lock"
            iconColor={COLORS.secondary}
            name="password"
            textContentType="password"
            keyboardType="email-address"
            secureTextEntry
          />
          <SubmitButton title="Sign Up" color={COLORS.primary} />
        </AppForm>
        <AppButton
          title="Login"
          color={COLORS.white}
          onPress={() => navigation.navigate("LoginPage")}
          style={{ borderWidth: 1, borderColor: COLORS.primary }}
          textColor={COLORS.primary}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  btnContainer: {
    width: "90%",
    marginBottom: 59,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  inputContainer: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginBottom: 25,
  },
  logo: {
    width: 175,
    height: 175,
    marginTop: 50,
  },
});
