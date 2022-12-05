import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import AppHeader from "../components/AppHeader";
import MainScreen from "../components/MainScreen";
import { useNavigation } from "@react-navigation/native";
import { ListingsContext } from "../context/listingContext";
const RecommendedScreen = () => {
  const navigation = useNavigation();
  const { listings, setListings } = React.useContext(ListingsContext);
  const [region, setRegion] = React.useState({
    //islamabad
    latitude: 33.6844,
    longitude: 73.0479,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  //displaying the markers on the map after getting location from array of objects listings

  return (
    <MainScreen>
      <AppHeader titleScreen="Map View" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
          showsTraffic={true}
          showsBuildings={true}
          showsIndoors={true}
          showsIndoorLevelPicker={true}
          onRegionChangeComplete={(region) => setRegion(region)}
        />
      </View>
    </MainScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
});
export default RecommendedScreen;
