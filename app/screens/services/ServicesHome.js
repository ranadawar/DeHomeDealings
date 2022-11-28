import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import MediumText from "../../components/texts/MediumText";
import ExtraLargeText from "../../components/texts/ExtraLargeText";
import SearchBoxServices from "../../components/SearchBoxServices";
import servicecolors from "../../config/servicecolors";
import ServiceItem from "../../components/ServiceItem";
import HomeServiceCard from "../../components/HomeServiceCard";
import { useNavigation } from "@react-navigation/native";
import ServiceCard from "../../components/ServiceCard";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const list = [
  {
    id: 1,
    title: "Home Cleaning",
    imageSource: require("../../../assets/images/many/service.jpg"),
  },
  {
    id: 2,
    title: "AC Repair",
    imageSource: require("../../../assets/images/many/service.jpg"),
  },
  {
    id: 3,
    title: "Beauty",
    imageSource: require("../../../assets/images/many/service.jpg"),
  },
];

const ServicesHome = ({ navigation }) => {
  const [listings, setListings] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getLisings();
  }, []);

  const getLisings = async () => {
    try {
      setLoading(true);
      const colRef = collection(db, "servicelistings");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      console.log(myData);

      setListings(myData);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <MediumText style={styles.nameText}>Hello Dawar👋</MediumText>
        <ExtraLargeText style={styles.bigText}>
          What you are looking for today
        </ExtraLargeText>
        <SearchBoxServices />
      </View>

      <View style={styles.middleContainer}>
        <ServiceItem
          bgColor={servicecolors.one}
          title="AC Repair"
          margr={27}
          icon="air-conditioner"
          onPress={() => navigation.navigate("Servicelistings")}
        />
        <ServiceItem
          bgColor={servicecolors.two}
          title="Beauty"
          margr={27}
          icon="hair-dryer"
        />
        <ServiceItem
          bgColor={servicecolors.three}
          title="Appliances"
          margr={27}
          icon="fridge"
        />
        <ServiceItem
          bgColor={servicecolors.light}
          title="See More"
          margr={27}
          icon="arrow-right"
          onPress={() => navigation.navigate("allservices")}
        />
      </View>

      <View style={styles.bottomContainer}>
        <ExtraLargeText style={styles.heading}>
          Top Cleaning Services
        </ExtraLargeText>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={listings}
          keyExtractor={(item) => item.description.toString()}
          renderItem={({ item }) => <ServiceCard title={item.title} />}
        />
      </View>
    </View>
  );
};

export default ServicesHome;

const styles = StyleSheet.create({
  bigText: {
    fontSize: 32,
    marginVertical: 10,
    color: servicecolors.font,
  },
  bottomContainer: {
    backgroundColor: servicecolors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 30,
    paddingBottom: 40,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    color: servicecolors.font,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: servicecolors.light,
  },
  nameText: {
    marginTop: 10,
  },

  topContainer: {
    backgroundColor: servicecolors.white,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 30,
  },
  middleContainer: {
    backgroundColor: servicecolors.white,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
  },
});
