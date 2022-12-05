import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AgreementsContext } from "../context/agreementContext";
import MainScreen from "../components/MainScreen";

import LottieView from "lottie-react-native";
import { AppForm, AppFormPicker, SubmitButton } from "../components/form";

import * as yup from "yup";
import { COLORS, FONTS } from "../constants/theme";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../components/AppButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const validationSchema = yup.object().shape({
  agreement: yup
    .object()
    .required()
    .nullable()
    .label("Agreement"),
});

const SendAgreements = ({ route }) => {
  const navigation = useNavigation();
  const myData = route.params;

  const docId = myData.bookingId;
  const {
    agreements,
    setAgreements,
    loadAgreements,
    setLoadAgreements,
  } = React.useContext(AgreementsContext);

  const addAgreement = async (item) => {
    const updatedData = item;
    setLoadAgreements(true);

    //add updatedData to firestore doc where bookingId = docId in the bookings collection
    const docRef = doc(db, "bookings", docId);
    await updateDoc(docRef, {
      agreement: updatedData,
    });
    setLoadAgreements(false);
    Alert.alert("Agreement Sent", "Agreement has been sent to the client");
    navigation.goBack();
  };

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Send Agreements"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Send Agreements</Text>

          <View style={styles.btnContainer}>
            <AppButton
              title="Create Agreement"
              onPress={() => navigation.navigate("Agreement")}
            />
          </View>

          <View style={styles.innerContainer}>
            <Text style={styles.texto}>
              Click on any of the following agreement to share it
            </Text>
            <FlatList
              data={agreements}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => addAgreement(item)}>
                  <View style={styles.agreementCard}>
                    <Text style={styles.label}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </MainScreen>
      <Modal visible={loadAgreements} animationType="slide">
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../assets/animations/agreement.json")}
            loop
            autoPlay
          />
        </View>
      </Modal>
    </>
  );
};

export default SendAgreements;

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    marginHorizontal: 35,
  },
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginVertical: 12,
    color: COLORS.primary,
  },
  agreementCard: {
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.secondary,
    textAlign: "center",
  },
  innerContainer: {
    marginHorizontal: 20,
    borderRadius: 12,
  },
  texto: {
    fontFamily: FONTS.regular,
    textAlign: "center",
    marginVertical: 10,
  },
});
