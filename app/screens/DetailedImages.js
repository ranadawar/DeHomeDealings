import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";

import ImageSlider from "react-native-image-slider";

const DetailedImages = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;
  return (
    <MainScreen>
      <AppHeader
        titleScreen="Detailed Images"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.mainContainer}>
        <ImageSlider loopBothSides autoPlayWithInterval={3000} images={data} />
      </View>
    </MainScreen>
  );
};

export default DetailedImages;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
