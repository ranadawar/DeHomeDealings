//code to create a react native screen to pick location with the help of a marker and display the location on the screen
//code to create a react native screen to pick location with the help of a marker and display the location on the screen

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GOOGLE_API_KEY } from "../../env";
import useLocation from "../hooks/useLocation";
import { COLORS, SHADOWS } from "../constants/theme";
import AutoComplete from "../components/AutoComplete";
import MainScreen from "../components/MainScreen";
import { ListingsContext } from "../context/listingContext";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = () => {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const { listings, setListings } = React.useContext(ListingsContext);

  const myLocation = useLocation();

  React.useLayoutEffect(() => {
    console.log("location", location);
    setLocation(myLocation);
  }, [location]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  let initialRegion = {
    latitude: 33.6844,
    longitude: 73.0479,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <MainScreen>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          //initialRegion to user locationh
          initialRegion={location ? location : initialRegion}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsTraffic={true}
          showsIndoors={true}
          showsBuildings={true}
        >
          {listings}
        </MapView>
        <View style={styles.searchBox}>
          <AutoComplete />
        </View>
      </View>
    </MainScreen>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  textContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    position: "absolute",
    width: "90%",
    top: 50,
    zIndex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 8,
    ...SHADOWS.medium,
  },
});
