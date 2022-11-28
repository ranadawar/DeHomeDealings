import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import MyListingCard from "../../components/MyListingCard";
import Card from "../../components/Card";

import LottieView from "lottie-react-native";
import AppHeader from "../../components/AppHeader";
import MainScreen from "../../components/MainScreen";
import { useNavigation } from "@react-navigation/native";

const MyListings = () => {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const navigation = useNavigation();
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
      //get the listings where the user id is equal to the current user id
      const filteredData = myData.filter(
        (item) => item.userId === auth.currentUser.uid
      );
      setListings(filteredData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MainScreen>
        <View style={{ flex: 1 }}>
          <AppHeader
            titleScreen="My Listings"
            onPress={() => navigation.goBack()}
          />
          <ActivityIndicator animating={loading} size="large" />
          <FlatList
            data={listings}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <Card
                rating="5"
                title={item.title}
                bedroom={item.bedrooms}
                bathroom={item.bathrooms}
                price={item.total}
                imgUrl={item.image}
                btnTexto="View Offers"
                onPress={() => {
                  navigation.navigate("viewmyhomeoffers", item);
                }}
                onPressHeart={() => Alert.alert("Added to favorite")}
              />
            )}
          />
        </View>
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../animations/loading.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default MyListings;

const styles = StyleSheet.create({});
