import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { COLORS } from "../constants/theme";
import colors from "../config/colors";

import { ExtraLargeText, LargeText, MediumText } from "../components/texts";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import servicecolors from "../config/servicecolors";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/form";
import CategoryPickerItem from "../components/CategoryPickerItem";

import * as yup from "yup";
import {
  areas,
  cities,
  dealCategories,
  dealCategoriesBuyer,
  propertyTypes,
  ratingTypes,
  userTypes,
} from "../data/store";
import MainScreen from "../components/MainScreen";

const initialValues = {
  purpose: "",
  propertyType: "",
  city: "",
  area: "",
  bedrooms: "",
  bathrooms: "",
  rating: "",
  userType: "",
  numOfRoomsFrom: "",
  numOfRoomsTo: "",
  numOfBathFrom: "",
  numOfBathTo: "",
  priceRangeFrom: "",
  priceRangeTo: "",
  sizeRangeFrom: "",
  sizeRangeTo: "",
};

const validationSchema = yup.object().shape({
  purpose: yup.string().label("Purpose"),
  propertyType: yup.string().label("Property Type"),
  city: yup.object().label("City"),
  area: yup
    .object()
    .nullable()
    .label("Area"),
  rating: yup.object().label("Rating"),
  userType: yup.object().label("User Type"),
  numOfRoomsFrom: yup.number().label("Number of Rooms from"),
  numOfRoomsTo: yup.number().label("Number of Rooms to"),
  numOfBathFrom: yup.number().label("Number of Bathrooms from"),
  numOfBathTo: yup.number().label("Number of Bathrooms to"),
  priceRangeFrom: yup.number().label("Price Range From"),
  priceRangeTo: yup.number().label("Price Range To"),
  sizeRangeFrom: yup.number().label("Size Range From"),
  sizeRangeTo: yup.number().label("Size Range To"),
});

const SearchHouse = ({ navigation }) => {
  return (
    <MainScreen>
      <View style={[styles.mainContainer, { flex: 1 }]}>
        <View style={styles.headingContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconContainer}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <ExtraLargeText>Search House</ExtraLargeText>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.purpose}>
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => navigation.navigate("Listings", values)}
            >
              <MediumText style={styles.heading}>Purpose</MediumText>
              <AppFormPicker
                items={dealCategoriesBuyer}
                name="category"
                placeholder="I want to..."
                PickerItemComponent={CategoryPickerItem}
                numOfColumns={3}
              />
              <MediumText style={styles.heading}>Property Type</MediumText>
              <AppFormPicker
                items={propertyTypes}
                name="propertyType"
                placeholder="Property Type"
                PickerItemComponent={CategoryPickerItem}
                numOfColumns={3}
              />
              <MediumText style={styles.heading}>City</MediumText>
              <AppFormPicker
                items={cities}
                name="city"
                placeholder="Select City"
                PickerItemComponent={CategoryPickerItem}
                numOfColumns={3}
              />
              <MediumText style={styles.heading}>Area</MediumText>
              <AppFormPicker
                items={areas}
                name="area"
                placeholder="Select Area"
              />
              <MediumText style={styles.heading}>Owner Type</MediumText>
              <AppFormPicker
                items={userTypes}
                name="userType"
                placeholder="Select User"
                PickerItemComponent={CategoryPickerItem}
                numOfColumns={3}
              />
              <MediumText style={styles.heading}>Ratings</MediumText>
              <AppFormPicker
                items={ratingTypes}
                name="rating"
                placeholder="Filter By Rating"
                PickerItemComponent={CategoryPickerItem}
                numOfColumns={3}
              />
              <MediumText style={styles.heading}>Number of Rooms</MediumText>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Number of Rooms from"
                icon="bed-double-outline"
                name="numOfRoomsFrom"
                iconColor={COLORS.secondary}
                keyboardType="number-pad"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Number of Rooms to"
                icon="bed-double-outline"
                name="numOfRoomsTo"
                iconColor={COLORS.secondary}
                keyboardType="number-pad"
              />
              <MediumText style={styles.heading}>
                Number of Bathrooms
              </MediumText>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Number of Bathrooms from"
                icon="bathtub-outline"
                name="numOfBathFrom"
                iconColor={COLORS.secondary}
                keyboardType="number-pad"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Number of Bathrooms to"
                icon="bathtub-outline"
                name="numOfBathTo"
                iconColor={COLORS.secondary}
                keyboardType="number-pad"
              />
              <MediumText style={styles.heading}>Size Range</MediumText>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Size Range from"
                icon="bathtub-outline"
                name="sizeRangeFrom"
                iconColor={COLORS.secondary}
                keyboardType="number-pad"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Size Range to"
                icon="bathtub-outline"
                name="sizeRangeTo"
                iconColor={COLORS.secondary}
                keyboardType="number-pad"
              />
              <MediumText style={styles.heading}>Price Range</MediumText>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Price Range from"
                icon="bathtub-outline"
                name="priceRangeFrom"
                iconColor={COLORS.secondary}
                keyboardType="number-pad"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Price Range to"
                icon="bathtub-outline"
                name="priceRangeTo"
                iconColor={COLORS.secondary}
                keyboardType="number-pad"
              />
              <View style={{ paddingBottom: 70, marginVertical: 15 }}>
                <SubmitButton title="Search" color={COLORS.primary} />
              </View>
            </AppForm>
          </View>
        </ScrollView>
      </View>
    </MainScreen>
  );
};
export default SearchHouse;

const styles = StyleSheet.create({
  headingContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderLeftWidth: 3,
    marginHorizontal: 15,
    borderLeftColor: servicecolors.three,
    borderRadius: 20,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  heading: {
    color: COLORS.primary,
  },
  iconContainer: {
    padding: 2,
    backgroundColor: servicecolors.three,
    borderRadius: 8,
    marginRight: 15,
  },
  logo: {
    minWidth: 120,
    height: 40,
    resizeMode: "contain",
  },
  logoContaienr: {
    width: "100%",
    height: 60,
    backgroundColor: COLORS.primary,
    paddingTop: 9,
  },
  mainContainer: {
    backgroundColor: colors.light,
    paddingHorizontal: 15,
  },
});
