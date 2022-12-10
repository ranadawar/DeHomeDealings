import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import Card from "../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeInFavorites } from "../global/functions";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../constants/theme";

const Recommender = () => {
  const [myArray, setMyArray] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    //get all recommended listings stored in async storage and set it to myArray
    getTheArray();
  }, [myArray]);

  const getTheArray = async () => {
    const value = await AsyncStorage.getItem("recommended");
    if (value !== null) {
      setMyArray(JSON.parse(value));
    }
  };

  return (
    <MainScreen>
      <AppHeader
        titleScreen="Recommended"
        onPress={() => navigation.goBack()}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.titleMain}>Recommended Listings</Text>
        <View style={{ flex: 1 }}>
          {myArray.length > 0 ? (
            myArray.map((item, index) => (
              <View key={index}>
                <Card
                  title={item.title}
                  bedroom={item.bedrooms}
                  bathroom={item.bathrooms}
                  price={item.total}
                  imgUrl={item.image[0]}
                  onPress={() => {
                    navigation.navigate("Details", item);
                  }}
                  onPressHeart={() => storeInFavorites(item)}
                />
              </View>
            ))
          ) : (
            <View style={styles.mainNo}>
              <Text>No Recommended Listings</Text>
            </View>
          )}
        </View>
      </View>
    </MainScreen>
  );
};

export default Recommender;

const styles = StyleSheet.create({
  mainNo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleMain: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 20,
  },
});
