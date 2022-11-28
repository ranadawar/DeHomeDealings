import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import ScreenHeader from "../components/ScreenHeader";
import ReportsComponent from "../components/ReportsComponent";
import MainScreen from "../components/MainScreen";

const ReportsScreen = ({ navigation }) => {
  return (
    <MainScreen>
      <View style={styles.container}>
        <ScrollView>
          <ScreenHeader
            headerText="Reports"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.innerContainer}>
            <ReportsComponent icon="file-eye" text="Viewed Listings" />
            <ReportsComponent icon="ticket-account" text="Previous Bookings" />
            <ReportsComponent icon="account-cash" text="Payments" />
            <ReportsComponent icon="file-sign" text="Agreements" />
          </View>
        </ScrollView>
      </View>
    </MainScreen>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({});
