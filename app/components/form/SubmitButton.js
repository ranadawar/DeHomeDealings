import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AppButton from "../AppButton";

import { useFormikContext } from "formik";

const SubmitButton = ({ title, color, textColor }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      title={title}
      onPress={handleSubmit}
      color={color}
      textColor={textColor}
    />
  );
};

export default SubmitButton;

const styles = StyleSheet.create({});
