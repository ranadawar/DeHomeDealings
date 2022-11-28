import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../constants/theme";
import { AppForm, AppFormField, SubmitButton } from "../components/form";

import * as yup from "yup";
import servicecolors from "../config/servicecolors";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const validationSchema = yup.object().shape({
  price: yup.string().required().min(1).max(12).label("Price"),
  message: yup.string().required().min(1).label("Message"),
});

const SendOfferScreen = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;
  React.useEffect(() => {
    console.log(data);
  }, []);

  const handleSendOffer = (values) => {
    console.log(values);
    const docId = data.listingId;
    const targetData = data.offers;
    const myObject = {
      price: values.price,
      message: values.message,
      status: "pending",
      user: auth.currentUser.uid,
    };
    const newArray = [...targetData, myObject];

    setDoc(
      doc(db, "listings", docId),
      {
        offers: newArray,
      },
      { merge: true }
    )
      .then(() => {
        console.log("Document successfully written!");
        Alert.alert("Offer Sent", "Your offer has been sent successfully", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  return (
    <MainScreen>
      <View style={styles.mainContainer}>
        <AppHeader
          titleScreen="Send Offer"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Send Offer</Text>
          <AppForm
            initialValues={{ price: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSendOffer(values)}
          >
            <AppFormField placeholder="Offer Price" name="price" icon="cash" />
            <AppFormField
              placeholder="Message in details"
              name="message"
              icon="email"
              multiline
              numberOfLines={7}
            />
            <SubmitButton title="Send Offer" color={servicecolors.three} />
          </AppForm>
        </View>
      </View>
    </MainScreen>
  );
};

export default SendOfferScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    marginVertical: 15,
    fontFamily: FONTS.bold,
  },
});
