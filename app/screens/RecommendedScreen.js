import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import AppHeader from "../components/AppHeader";
import MainScreen from "../components/MainScreen";
const RecommendedScreen = () => {
  return (
    <MainScreen>
      <View style={styles.container}>
        <AppHeader titleScreen="Map View" />
        <MapView style={styles.map} />
      </View>
    </MainScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
});
export default RecommendedScreen;
