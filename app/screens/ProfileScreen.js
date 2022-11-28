import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import colors from "../config/colors";
import { COLORS, FONTS } from "../constants/theme";
import ScreenHeader from "../components/ScreenHeader";
import LinkComponents from "../components/LinkComponents";
import AppButton from "../components/AppButton";
import { auth } from "../../firebase";
import MainScreen from "../components/MainScreen";

const ProfileScreen = ({ navigation }) => {
  return (
    <MainScreen>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <ScreenHeader
          headerText="Profile"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={require("../../assets/images/many/mosh.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.name}>Dawar</Text>
          <Text style={styles.bioText}>{auth.currentUser.email}</Text>
        </View>
        <View style={styles.midContainer}>
          <Text style={styles.midTitle}>My Housing</Text>
          <LinkComponents
            title="My Listings"
            icon="post"
            onPress={() => navigation.navigate("Mylisting")}
          />
          <LinkComponents
            title="Reports"
            iconStyle={colors.secondary}
            icon="information"
            onPress={() => navigation.navigate("Reports")}
          />
          <LinkComponents title="Favorites" iconStyle="blue" icon="heart" />
          <LinkComponents title="Payments" iconStyle="green" icon="cash" />
          <LinkComponents
            title="Sell Service"
            iconStyle="brown"
            icon="face-man"
            onPress={() => navigation.navigate("Selling")}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.midTitle}>General</Text>
          <LinkComponents
            title="Update Profile"
            iconStyle="orange"
            icon="update"
            onPress={() => navigation.navigate("updateprofile")}
          />
          <LinkComponents
            title="Contact Support"
            iconStyle="purple"
            icon="help-box"
          />
          <LinkComponents
            title="Report a problem"
            iconStyle="#ee6c4d"
            icon="alarm-multiple"
            onPress={() => navigation.navigate("report")}
          />
        </View>

        <View style={{ marginVertical: 30, marginHorizontal: 20 }}>
          <AppButton title="log Out" onPress={() => auth.signOut()} />
        </View>
      </ScrollView>
    </MainScreen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bioText: {
    fontFamily: FONTS.medium,
    color: COLORS.secondary,
  },
  bottomContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  topContainer: {
    height: 273,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
    overflow: "hidden",
  },
  imageContainer: {
    overflow: "hidden",
  },
  midContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  midTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: 10,
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: colors.white,
    marginVertical: 7,
  },
});
