import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import React from "react";

import AppButton from "../components/AppButton";
import { COLORS } from "../constants/theme";

import * as yup from "yup";
import AppFormField from "../components/form/AppFormField";
import AppForm from "../components/form/AppForm";
import SubmitButton from "../components/form/SubmitButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().min(5).max(12).label("Password"),
});

const LoginScreen = ({ navigation }) => {
  const handleLogin = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Alert.alert("Success", "User logged in successfully");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
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
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: COLORS.primary,
            marginTop: 20,
          }}
        >
          Login
        </Text>
      </View>
      <AppForm
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => handleLoginIn(values)}
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
          placeholder="Enter Password"
          icon="lock"
          iconColor={COLORS.secondary}
          name="password"
          textContentType="password"
          keyboardType="email-address"
          secureTextEntry
        />
        <SubmitButton title="login" color={COLORS.primary} />
      </AppForm>

      <AppButton
        title="Register"
        color={COLORS.white}
        onPress={() => navigation.navigate("RegisterPage")}
        style={{ borderWidth: 1, borderColor: COLORS.primary }}
        textColor={COLORS.primary}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  btnContainer: {
    width: "90%",
    marginBottom: 70,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 70,
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
    width: 275,
    height: 275,
    marginTop: 50,
  },
});
