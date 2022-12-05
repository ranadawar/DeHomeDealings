import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../constants/theme";

const ViewTheAgreement = ({ route }) => {
  const data = route.params;

  const navigation = useNavigation();

  return (
    <MainScreen>
      <AppHeader titleScreen="Agreement" onPress={() => navigation.goBack()} />
      {data.agreement ? (
        <View style={styles.container}>
          <Text style={styles.title}>Agreement</Text>
        </View>
      ) : (
        <View style={styles.noContainer}>
          <Text style={styles.title}>No Agreement</Text>
        </View>
      )}
    </MainScreen>
  );
};

export default ViewTheAgreement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
  },
});
