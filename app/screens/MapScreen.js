import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";

import MapView, { Marker, Circle } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const [theRegion, setTheRegion] = React.useState({
    //islamabad comsats university
    latitude: 33.7215,
    longitude: 73.0433,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const navigation = useNavigation();

  return (
    <MainScreen>
      <AppHeader titleScreen="Map Screen" onPress={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <View style={styles.search}>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            placeholder="Search"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setTheRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
              console.log(details.geometry.location);
              //set region to the selected location coordinates
            }}
            query={{
              key: "AIzaSyDxkPKY9o1rX6Zf3FdJe3Ti5qBxJ71KU4U",
              language: "en",
              components: "country:pk",
              types: "(cities)",
              radius: 30000,
              location: `${theRegion.latitude}, ${theRegion.longitude}`,
            }}
          />
        </View>
        <MapView style={{ flex: 1 }} initialRegion={theRegion}>
          <Marker
            coordinate={{
              latitude: theRegion.latitude,
              longitude: theRegion.longitude,
            }}
            title="My Marker"
            draggable
            onDragEnd={(e) =>
              setTheRegion(console.log(e.nativeEvent.coordinate))
            }
            onPress={() => console.log("Marker pressed")}
          ></Marker>
          <Circle center={theRegion} radius={1000} />
        </MapView>
      </View>
    </MainScreen>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  input: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#888",
    fontSize: 18,
    borderWidth: 2,
    color: "#888",
  },

  search: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    zIndex: 1,
  },
});
