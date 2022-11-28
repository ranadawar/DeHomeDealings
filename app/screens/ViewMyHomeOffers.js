import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import MyListingCard from "../components/MyListingCard";

const ViewMyHomeOffers = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;
  return (
    <MainScreen>
      {data && (
        <View style={{ flex: 1 }}>
          <AppHeader
            onPress={() => navigation.goBack()}
            titleScreen="Listing Offers"
          />
          <FlatList
            data={data.offers}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <MyListingCard message={item.message} price={item.price} />
            )}
          />
        </View>
      )}
      {!data && (
        <View style={{ flex: 1 }}>
          <AppHeader />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No Offers Yet</Text>
          </View>
        </View>
      )}
    </MainScreen>
  );
};

export default ViewMyHomeOffers;

const styles = StyleSheet.create({});
