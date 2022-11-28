import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";

import { BarCodeScanner } from "expo-barcode-scanner";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";

const QrCodeScanner = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const navigation = useNavigation();
  const [id, setId] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setId(data);
    console.log(id);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  return (
    <MainScreen>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <>
          <View style={styles.mainQrCode}>
            <View style={styles.qrCodeIcon}>
              <Image
                resizeMode="contain"
                source={require("../../assets/icons/qrcode.png")}
                style={styles.qrCodeIcon}
              />
            </View>
          </View>
          <View style={styles.btnContainer}>
            <AppButton
              title="Tap to Re-Scan"
              color={colors.danger}
              textColor={colors.white}
              onPress={() => setScanned(false)}
            />
            <AppButton
              title="Check Listing"
              onPress={() => navigation.navigate("qrDetails", id)}
              color={colors.secondary}
            />
          </View>
        </>
      )}
    </MainScreen>
  );
};

export default QrCodeScanner;

const styles = StyleSheet.create({
  btnContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },
  qrCodeIcon: {
    width: 150,
    height: 150,
    backgroundColor: colors.white,
  },
  mainQrCode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
