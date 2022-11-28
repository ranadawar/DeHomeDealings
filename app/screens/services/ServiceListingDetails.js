import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";
import colors from "../../config/colors";
import { FONTS, COLORS } from "../../constants/theme";
import AppButton from "../../components/AppButton";

const ServiceListingDetails = ({ route, navigation }) => {
  const data = route.params;
  return (
    <MainScreen>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={require("../../../assets/images/many/services.jpg")}
              style={styles.image}
            />
            <View style={styles.absContainer}>
              <Text style={styles.city}>🗺{data.city.label}</Text>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{data.title}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{data.description}</Text>
          </View>
          <View style={styles.btnContainer}>
            <AppButton
              title="Call Us Now!"
              color={colors.secondary}
              onPress={() => Linking.openURL(`tel:${data.total}`)}
            />
            <AppButton
              title="Send Us a Request!"
              color={colors.primary}
              onPress={() => Linking.openURL(`tel:${data.total}`)}
            />
          </View>
        </View>
      </ScrollView>
    </MainScreen>
  );
};

export default ServiceListingDetails;

const styles = StyleSheet.create({
  absContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: colors.white,
    padding: 7,
    borderRadius: 10,
  },
  btnContainer: {
    marginHorizontal: 20,
  },
  description: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
  },
  descriptionTitle: {
    color: COLORS.primary,
    marginVertical: 5,
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  image: {
    width: "100%",
    height: 275,
  },
  imageContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  titleContainer: {
    backgroundColor: colors.white,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 25,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
});
