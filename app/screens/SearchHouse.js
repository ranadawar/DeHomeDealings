import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { ListingsContext } from "../context/listingContext";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/form";

import * as Yup from "yup";
import { FONTS, COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CategoryPickerItem from "../components/CategoryPickerItem";

import { areas, cities } from "../data/store";

const initialValues = {
  maxPrice: 0,
  numberOfBedrooms: 0,
  numberOfBathrooms: 0,
  minArea: 0,
};

const validationSchema = Yup.object().shape({
  maxPrice: Yup.number()
    .required()
    .min(1)
    .label("Max Price"),
  numberOfBedrooms: Yup.number()
    .required()
    .min(1)
    .label("Number of Bedrooms"),
  numberOfBathrooms: Yup.number()
    .required()
    .min(1)
    .label("Number of Bathrooms"),
  minArea: Yup.number()
    .required()
    .min(1)
    .label("Min Area"),
});

const SearchHouse = () => {
  const [loading, setLoading] = React.useState(false);

  const {
    listings,
    setListings,
    loadListings,
    setLoadListings,
  } = React.useContext(ListingsContext);
  const [filtered, setFiltered] = React.useState(listings);
  const navigation = useNavigation();

  const handleSubmit = (values) => {
    const myMaxPrice = values.maxPrice;
    const myNumberOfBedrooms = values.numberOfBedrooms;
    const myNumberOfBathrooms = values.numberOfBathrooms;
    const myMinArea = values.minArea;

    const filteredListings = listings.filter(
      (item) =>
        item.total <= myMaxPrice ||
        item.bedrooms >= myNumberOfBedrooms ||
        item.bathrooms >= myNumberOfBathrooms ||
        item.area.value >= myMinArea
    );

    if (filteredListings.length > 0) {
      setFiltered(filteredListings);
    } else {
      setFiltered(listings);
    }
    addToRecommended(filteredListings);
    navigation.navigate("searchresults", filtered);
  };

  const addToRecommended = async (filteredListings) => {
    //merge this array in the recommended array stored in AsyncStorage
    const recommended = await AsyncStorage.getItem("recommended");
    const recommendedArray = JSON.parse(recommended);
    const mergedArray = [...recommendedArray, ...filteredListings];
    await AsyncStorage.setItem("recommended", JSON.stringify(mergedArray));
  };

  return (
    <MainScreen>
      <AppHeader
        titleScreen="Search House"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search House</Text>
        <AppForm
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="maxPrice"
            placeholder="Max Price"
            keyboardType="numeric"
            width="48%"
          />
          <AppFormField
            name="numberOfBedrooms"
            placeholder="Number of Bedrooms"
            keyboardType="numeric"
            width="48%"
          />
          <AppFormField
            name="numberOfBathrooms"
            placeholder="Number of Bathrooms"
            keyboardType="numeric"
            width="48%"
          />
          <AppFormPicker
            items={cities}
            name="city"
            placeholder="Select City"
            PickerItemComponent={CategoryPickerItem}
            numOfColumns={3}
          />
          <AppFormPicker items={areas} name="area" placeholder="Select Area" />

          <AppFormField
            name="minArea"
            placeholder="Min Area (marla)"
            keyboardType="numeric"
            width="48%"
          />

          <SubmitButton title="Search" />
        </AppForm>
      </View>
    </MainScreen>
  );
};

export default SearchHouse;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.secondary,
  },
});
