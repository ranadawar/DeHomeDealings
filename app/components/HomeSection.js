import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants/theme";

import AppButton from "./AppButton";
import servicecolors from "../config/servicecolors";
const HomeSection = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.tag}>Hello Dawar👋</Text>
      <Text style={styles.head}>Let's find a dream house</Text>

      <View>
        <AppButton
          title="Verify Yourself"
          color={servicecolors.primary}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default HomeSection;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  head: {
    fontSize: 18,
    color: COLORS.white,
    marginVertical: 7,
    fontFamily: FONTS.bold,
  },
  tag: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: FONTS.light,
  },
});
