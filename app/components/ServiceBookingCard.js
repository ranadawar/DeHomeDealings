import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WithHeading from "./WithHeading";
import AppButton from "./AppButton";

const ServiceBookingCard = (data) => {
  return (
    <View style={styles.mainContainer}>
      <WithHeading heading="Needed on:" data={data.date} />
      <WithHeading heading="Location:" data={data.location} />
      <WithHeading heading="At Date:" data={data.date} />
      <WithHeading heading="At Time:" data={data.time} />
      <WithHeading heading="Request Status:" data={data.status} />

      <View>
        <AppButton title="View Details" onPress={onPress} />
      </View>
    </View>
  );
};

export default ServiceBookingCard;

const styles = StyleSheet.create({});
