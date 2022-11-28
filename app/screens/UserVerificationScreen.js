import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Text,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { AppForm, AppFormField, SubmitButton } from "../components/form";

import * as yup from "yup";

import { COLORS, FONTS } from "../constants/theme";
import LargeText from "../components/texts/LargeText";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db, storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import MainScreen from "../components/MainScreen";

import * as ImagePicker from "expo-image-picker";
import { randomString } from "../global/functions";
import colors from "../config/colors";

const uvInitialValues = { cnic: "", phone: "", address: "", postelCode: "" };

const uvValidationSchema = yup.object().shape({
  cnic: yup.string().required().min(13).max(13).label("CNIC"),
  phone: yup.string().required().min(11).max(11).label("Phone"),
  address: yup.string().required().label("Address"),
  postelCode: yup.string().required().min(5).max(5).label("Postel Code"),
});

const UserVerificationScreen = ({ navigation }) => {
  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);
  };

  //upload image on firebase version 9
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    //set the filename
    const filename = randomString(10);
    //set the reference
    const ref = storage.ref().child(`images/${filename}`);
    return ref.put(blob);
  };

  const handleSubmit = async (values) => {
    const user = auth.currentUser;

    const docId = randomString(25);
    try {
      setDoc(doc(db, "vrequests", docId), {
        cnic: values.cnic,
        phone: values.phone,
        address: values.address,
        postelCode: values.postelCode,
        uid: user.uid,
        imgUri: image.uri,
      });
      uploadImage(image.uri);
      Alert.alert("Success", "User verification request sent");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const cancelImage = () => {
    setImage(null);
  };

  return (
    <MainScreen>
      <ScrollView style={styles.mainContainer}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 3,
              backgroundColor: COLORS.primary,
              borderRadius: 20,
              marginHorizontal: 10,
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <LargeText>UserVerification</LargeText>
        </View>
        <View style={styles.innerContainer}>
          <Image
            source={require("../../assets/svgs/verification.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <LargeText style={{ marginVertical: 15, color: COLORS.primary }}>
            UserVerification
          </LargeText>

          {!image && (
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              <MaterialCommunityIcons
                name="camera"
                color={COLORS.primary}
                size={45}
              />
              <Text style={styles.cnicText}>CNIC Image</Text>
            </TouchableOpacity>
          )}
          {image && (
            <View style={styles.selectionView}>
              <Image
                source={{ uri: image.uri }}
                resizeMode="contain"
                style={styles.imageSelected}
              />
              <TouchableOpacity
                onPress={cancelImage}
                style={styles.crossContainer}
              >
                <MaterialCommunityIcons
                  name="minus-circle"
                  color={COLORS.white}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          )}

          <AppForm
            initialValues={uvInitialValues}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={uvValidationSchema}
          >
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="CNIC e.g. 3410112334904"
              icon="email"
              name="cnic"
              iconColor={COLORS.secondary}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Phone Number e.g. 03030623268"
              icon="phone"
              name="phone"
              iconColor={COLORS.secondary}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Address e.g. Street#, City, Country"
              icon="marker"
              name="address"
              iconColor={COLORS.secondary}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Postel Code e.g. 52330"
              icon="email"
              name="postelCode"
              iconColor={COLORS.secondary}
            />
            <SubmitButton title="Submit Request" />
          </AppForm>
        </View>
      </ScrollView>
    </MainScreen>
  );
};

export default UserVerificationScreen;

const styles = StyleSheet.create({
  cnicText: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
  },
  crossContainer: {
    position: "absolute",
    top: 10,
    right: 5,
    backgroundColor: colors.danger,
    borderRadius: 20,
    padding: 5,
  },
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",

    paddingHorizontal: 20,
  },
  image: {
    width: 175,
    height: 175,
    marginVertical: 20,
    alignSelf: "center",
  },
  imagePicker: {
    width: 125,
    height: 125,
    marginVertical: 20,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  imageSelected: {
    width: 300,
    height: 250,
  },
});
