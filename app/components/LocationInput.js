import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { GOOGLE_API_KEY } from "../../env";
import { COLORS } from "../constants/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const LocationInput = () => {
  const [location, setLocation] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState(null);

  return (
    <View style={styles.mainContainer}>
      {/* pick location using googleplaces api */}
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
          components: "country:pk",
        }}
      />
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#888",
    fontSize: 18,
    borderWidth: 2,
    color: COLORS.gray,
  },
  mainContainer: {
    height: 50,
    padding: 8,
    backgroundColor: COLORS.white,
  },
});
