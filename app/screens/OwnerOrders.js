import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { OrdersContext } from "../context/ordersContext";
import { auth } from "../../firebase";
import { COLORS, FONTS } from "../constants/theme";
import OrderCard from "../components/OrderCard";

const OwnerOrders = () => {
  const navigation = useNavigation();
  const {
    orders,
    setOrders,
    ordersLoading,
    setOrdersLoading,
  } = React.useContext(OrdersContext);

  const myOrders = orders.filter(
    (item) => item.owner.uid === auth.currentUser.uid
  );

  const getOrders = async () => {
    setOrdersLoading(true);
    try {
      const colRef = collection(db, "orders");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setOrders(myData);
      setOrdersLoading(false);
    } catch (error) {
      console.log(error);
      setOrdersLoading(false);
    }
  };

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="My Orders"
          onPress={() => navigation.goBack()}
        />
        {myOrders.length > 0 ? (
          <View style={styles.mainContainer}>
            <Text style={styles.titleYes}>My Orders</Text>
            <FlatList
              data={myOrders}
              keyExtractor={(item) => item.orderId}
              renderItem={({ item }) => (
                <OrderCard
                  data={item}
                  onPressButton={() => {
                    if (item.orderStatus === "started") {
                      navigation.navigate("viewownerorderdetails", item);
                    } else {
                      navigation.navigate("completedscreen", item);
                    }
                  }}
                />
              )}
            />
          </View>
        ) : (
          <View style={styles.noMainContainer}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={ordersLoading}
                  onRefresh={getOrders}
                />
              }
            >
              <Text style={styles.titleNo}>You have no Orders!</Text>
            </ScrollView>
          </View>
        )}
      </MainScreen>
    </>
  );
};

export default OwnerOrders;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  noMainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleYes: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginVertical: 20,
    color: COLORS.secondary,
  },
  titleNo: {
    fontSize: 20,
  },
});
