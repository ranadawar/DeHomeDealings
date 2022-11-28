import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import ScreenHeader from "../components/ScreenHeader";
import colors from "../config/colors";
import { COLORS } from "../constants/theme";

const InboxScreen = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader headerText="Inbox" />
      <View style={styles.searchBox}>
        <View style={styles.topSearchContainer}>
          <MaterialCommunityIcons
            name="icons"
            size={30}
            color={COLORS.primary}
            style={styles.icon}
          />
          <TextInput placeholder="Send a message..." />
        </View>
        <TouchableOpacity>
          <Icon name="share" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginHorizontal: 5,
  },
  searchBox: {
    position: "absolute",
    bottom: 15,
    left: 5,
    right: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    marginHorizontal: 12,
    borderRadius: 15,
    justifyContent: "space-between",
    paddingHorizontal: 7,
  },
  topSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
