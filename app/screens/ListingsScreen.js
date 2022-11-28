import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";

import Card from "../components/Card";
import ActivityIndicator from "../components/animation/ActivityIndicator";
import LottieView from "lottie-react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LargeText } from "../components/texts";
import { COLORS } from "../constants/theme";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import MainScreen from "../components/MainScreen";
import AppTextInput from "../components/AppTextInput";

const ListingsScreen = ({ navigation }) => {
  const [listings, setListings] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [nftData, setNftData] = useState("");
  const [searchData, setSearchData] = useState(listings);

  useEffect(() => {
    getLisings();
    return;
  }, []);
  const getLisings = async () => {
    try {
      setLoading(true);
      const colRef = collection(db, "listings");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      //store data in AsyncStorage
      setListings(myData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (value) => {
    if (!value.length) return setListings(listings);

    const filteredData = listings.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredData.length) {
      setListings(filteredData);
    } else {
      setListings(listings);
    }
  };

  return (
    <>
      <MainScreen>
        <View style={{ marginBottom: 70 }}>
          <ActivityIndicator visible={loading} />
          <View style={styles.headerr}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={25}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <LargeText style={{ color: COLORS.white }}>Listings</LargeText>
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <View style={styles.searchBoxStyle}>
              <AppTextInput
                placeholder="Search House"
                onChangeText={(text) => handleSearch(text)}
              />
            </View>

            <FlatList
              data={listings}
              keyExtractor={(item) => item.listingPosted}
              renderItem={({ item }) => (
                <Card
                  rating="5"
                  title={item.title}
                  bedroom={item.bedrooms}
                  bathroom={item.bathrooms}
                  price={item.total}
                  imgUrl={item.image}
                  onPress={() => {
                    navigation.navigate("Details", { listing: item });
                  }}
                  onPressHeart={() => Alert.alert("Added to favorite")}
                />
              )}
            />
          </View>
        </View>
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../animations/loadlistings.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default ListingsScreen;

const styles = StyleSheet.create({
  headerr: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  iconContainer: {
    padding: 2,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginRight: 15,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  searchBoxStyle: {
    marginHorizontal: 5,
  },
});
