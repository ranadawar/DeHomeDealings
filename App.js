import { StyleSheet } from "react-native";
import React, { useState } from "react";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import colors from "./app/config/colors";
import { useFonts } from "expo-font";
import { UserProvider } from "./app/context/userContext";
import { ListingsProvider } from "./app/context/listingContext";
import { AgreementsProvider } from "./app/context/agreementContext";
import { BanksProvider } from "./app/context/banksContext";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.light,
  },
};

const App = () => {
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    firebaseAuthState();
  }, []);

  const firebaseAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };
  const [fontsLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <AgreementsProvider>
      <BanksProvider>
        <ListingsProvider>
          <UserProvider>
            <NavigationContainer theme={theme}>
              {user ? <TabNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </UserProvider>
        </ListingsProvider>
      </BanksProvider>
    </AgreementsProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
