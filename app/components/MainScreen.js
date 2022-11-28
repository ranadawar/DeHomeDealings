import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Constants from "expo-constants";
const MainScreen = ({ children }) => {
  return <View style={styles.mainContainer}>{children}</View>;
};

export default MainScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
