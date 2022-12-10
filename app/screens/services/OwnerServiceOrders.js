import {
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";

import LottieView from "lottie-react-native";
import { SordersContext } from "../../context/sOrdersContext";
import { auth } from "../../../firebase";
import { COLORS, FONTS } from "../../constants/theme";
import ServiceOrderCard from "../../components/ServiceOrderCard";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";

const OwnerServiceOrders = () => {
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const { sOrders, setSOrders } = React.useContext(SordersContext);

  const myOrders = sOrders.filter(
    (item) => item.user.uid === auth.currentUser.uid
  );

  const getOrders = async () => {
    console.log("refreshing");
  };
  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="User Service Orders"
          onPress={() => navigation.goBack()}
        />
        {myOrders.length > 0 ? (
          <View style={styles.mainContainer}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getOrders} />
              }
            >
              <Text style={styles.text}>User Service Orders</Text>
              {myOrders.map((item, index) => (
                <View key={index}>
                  <ServiceOrderCard
                    data={item}
                    onPressButton={() =>
                      navigation.navigate("ownerserviceorderdetails", item)
                    }
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.noMainContainer}>
            <Text style={styles.noText}>No Orders</Text>
          </View>
        )}
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../../assets/animations/find.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default OwnerServiceOrders;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: COLORS.secondary,
    fontFamily: FONTS.semiBold,
    marginVertical: 10,
    textAlign: "center",
  },
  noMainContainer: {},
  noText: {},
});
