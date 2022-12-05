import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import WithHeading from "../components/WithHeading";
import { FONTS, COLORS } from "../constants/theme";
import moment from "moment";
import AppButton from "../components/AppButton";

const SeeMyOffersDetail = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();

  const myDateFrom = moment(data.dateFrom).format("DD MMM YYYY");
  if (data.dateTo) {
    var myDateTo = moment(data.dateTo).format("DD MMM YYYY");
  }

  const moveToChat = () => {
    navigation.navigate("commentscreen", data);
  };

  const seeAgreement = () => {
    navigation.navigate("viewtheagreement", data);
  };

  return (
    <MainScreen>
      <AppHeader
        titleScreen="Offer Detail"
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>Offer Details</Text>
      <View style={styles.mainContainer}>
        <WithHeading heading="Request for:" data={data.type} />
        <WithHeading heading="Requested by:" data={data.user} />
        <WithHeading heading="Request Title:" data={data.title} />
        {data.price && <WithHeading heading="Price:" data={data.price} />}
        <WithHeading data={myDateFrom} heading="Needed From:" />
        {myDateTo && <WithHeading data={myDateTo} heading="Date To:" />}

        <View style={styles.innerContainer}>
          <AppButton title="Chat" onPress={moveToChat} color={COLORS.primary} />
          <AppButton
            title="See Agreement"
            onPress={seeAgreement}
            color={COLORS.secondary}
          />
        </View>

        <View>
          <Text style={styles.agreeTerms}>Agree With Terms&Conditions</Text>

          <View style={styles.bottomBtnContainer}>
            <AppButton title="Place order" />
          </View>
        </View>
      </View>
    </MainScreen>
  );
};

export default SeeMyOffersDetail;

const styles = StyleSheet.create({
  agreeTerms: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    marginVertical: 5,
    textAlign: "center",
  },
  bottomBtnContainer: {},
  mainContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});
