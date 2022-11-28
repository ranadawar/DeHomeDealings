import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React from "react";

import { COLORS } from "../constants/theme";
import HomeHeader from "../components/HomeHeader";
import HomeSection from "../components/HomeSection";
import Card from "../components/Card";
import LinkButton from "../components/LinkButton";
import MainScreen from "../components/MainScreen";
import { useNavigation } from "@react-navigation/native";

const listings = [
  {
    id: 1,
    title: "A very beautiful looking house in Lahore",
    desc: "Located at the heart of Lahore this beautiful house has 5 rooms, 3 bathrooms, 2 Kitchens",
    price: 5000000,
    rating: 4.7,
    bathroom: 2,
    bedroom: 8,
    imgUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    title: "A very beautiful looking house in Lahore",
    desc: "Located at the heart of Lahore this beautiful house has 5 rooms, 3 bathrooms, 2 Kitchens",
    price: 5000000,
    rating: 4.7,
    bathroom: 2,
    bedroom: 8,
    imgUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 3,
    title: "A very beautiful looking house in Lahore",
    desc: "Located at the heart of Lahore this beautiful house has 5 rooms, 3 bathrooms, 2 Kitchens",
    price: 2499999,
    rating: 4.7,
    bathroom: 2,
    bedroom: 8,
    imgUrl:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 4,
    title: "A very beautiful looking house in Lahore",
    desc: "Located at the heart of Lahore this beautiful house has 5 rooms, 3 bathrooms, 2 Kitchens",
    price: 8900000,
    rating: 4.7,
    bathroom: 2,
    bedroom: 8,
    imgUrl:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80",
  },
  {
    id: 5,
    title: "Great looking housing in Sadar",
    desc: "Located at the heart of Lahore this beautiful house has 5 rooms, 3 bathrooms, 2 Kitchens",
    price: 8900000,
    rating: 4.7,
    bathroom: 2,
    bedroom: 8,
    imgUrl:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80",
  },
];

const HomeScreen = ({ navigation }) => {
  const navigations = useNavigation();
  return (
    <MainScreen>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={styles.firstBg}></View>
          <View style={styles.mainContainer}>
            <HomeHeader
              onPressNav={() => navigations.openDrawer()}
              onPressPic={() => navigation.navigate("Profile")}
            />
            <HomeSection onPress={() => navigation.navigate("Verify")} />
            <View style={styles.btnsContainer}>
              <LinkButton
                title="Listings"
                onPress={() => navigation.navigate("Listings")}
              />
              <LinkButton
                title="Agreement"
                onPress={() => navigation.navigate("Agreement")}
              />
              <LinkButton
                title="Services"
                onPress={() => navigation.navigate("services")}
              />
            </View>
            <View style={styles.btnsContainer}>
              <LinkButton
                title="Map View"
                onPress={() => navigation.navigate("foryou")}
              />
              <LinkButton
                title="Sell Service"
                onPress={() => navigation.navigate("Selling")}
              />
              <LinkButton
                title="QR Code"
                onPress={() => navigation.navigate("qrcodescanner")}
              />
            </View>
            <FlatList
              data={listings}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card
                  bathroom={item.bathroom}
                  bedroom={item.bedroom}
                  imgUrl={item.imgUrl}
                  price={item.price}
                  rating={item.rating}
                  onPress={() => navigation.navigate("Details", item)}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>
    </MainScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginHorizontal: 20,
  },
  firstBg: {
    width: "100%",
    height: 373,
    backgroundColor: COLORS.primary,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  mainContainer: {
    flex: 1,
  },
});
