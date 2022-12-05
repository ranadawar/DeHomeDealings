import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";
import AppHeader from "../../components/AppHeader";
import { AppForm, AppFormField, SubmitButton } from "../../components/form";

import * as yup from "yup";
import AppFormDatePicker from "../../components/form/AppFormDatePicker";
import { FONTS } from "../../constants/theme";

const validationSchema = yup.object().shape({
  location: yup
    .string()
    .required()
    .min(1)
    .label("Location"),
  date: yup
    .date()
    .required("Required")
    .label("Date"),
  time: yup
    .date()
    .required("Required")
    .label("Date"),
  description: yup
    .string()
    .required()
    .min(1)
    .label("Description"),
});

const initialValues = {
  location: "",
  date: "",
  time: "",
  description: "",
};

const handleSubmit = (values) => {
  const data = {
    location: values.location,
    date: values.date,
    time: values.time,
    description: values.description,
  };
  console.log(data);
};

const ServiceBookingForm = () => {
  return (
    <MainScreen>
      <AppHeader titleScreen="Service Booking" />
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONTS.bold,
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          Service Booking Form
        </Text>
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <AppFormField
            name="location"
            placeholder="Location"
            icon="map-marker"
          />
          <AppFormDatePicker name="date" placeholder="Date" />
          <AppFormTimePicker name="time" placeholder="Time" />
          <AppFormField
            name="description"
            placeholder="Description"
            icon="text"
          />

          <SubmitButton title="Book now!" />
        </AppForm>
      </View>
    </MainScreen>
  );
};

export default ServiceBookingForm;

const styles = StyleSheet.create({});
