import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import React from "react";
import colors from "../config/colors";
import { ExtraLargeText } from "../components/texts";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../constants/theme";
import servicecolors from "../config/servicecolors";
import { AppForm, AppFormField, SubmitButton } from "../components/form";

import * as yup from "yup";

import LottieView from "lottie-react-native";
import MainScreen from "../components/MainScreen";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { randomString } from "../global/functions";

const reportValidationSchema = yup.object().shape({
  title: yup.string().required().min(5).max(20).label("Title"),
  description: yup.string().required().min(15).max(1200),
  user: yup.string(),
});

const ReportProblemScreen = ({ navigation }) => {
  const handleSubmit = async (values) => {
    const docId = randomString(25);
    try {
      setDoc(doc(db, "problems", docId), {
        title: values.title,
        description: values.description,
        user: auth().currentUser.uid,
        status: "pending",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <MainScreen>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconContainer}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <ExtraLargeText>Report a Problem</ExtraLargeText>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/svgs/problem.png")}
              style={styles.image}
            />
          </View>
          <KeyboardAvoidingView>
            <AppForm
              initialValues={{ title: "", description: "", user: "" }}
              validationSchema={reportValidationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              <KeyboardAvoidingView style={styles.formContainer}>
                <AppFormField
                  placeholder="Enter Title"
                  icon="format-title"
                  name="title"
                  iconColor={COLORS.secondary}
                />
                <AppFormField
                  placeholder="Enter Description"
                  icon="details"
                  name="description"
                  iconColor={COLORS.secondary}
                  keyboardType="email-address"
                  multiline
                  numberOfLines={8}
                />
                <SubmitButton title="Report" />
              </KeyboardAvoidingView>
            </AppForm>
          </KeyboardAvoidingView>
        </View>
      </MainScreen>
    </>
  );
};

export default ReportProblemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    paddingHorizontal: 20,
  },

  headingContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderLeftWidth: 3,
    marginHorizontal: 15,
    borderLeftColor: servicecolors.three,
    borderRadius: 20,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    padding: 2,
    backgroundColor: servicecolors.three,
    borderRadius: 8,
    marginRight: 15,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 145,
    height: 145,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeading: {
    width: "100%",
    padding: 10,
    marginVertical: 20,
  },
});
