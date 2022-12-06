import React from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const ListingsContext = React.createContext("");

const ServicesProvider = ({ children }) => {
  const [servicesListings, setServicesListings] = React.useState([]);
  const [loadServicesListings, setLoadServicesListings] = React.useState(false);

  const getListings = async () => {
    setLoadServicesListings(true);
    try {
      const colRef = collection(db, "listings");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setServicesListings(myData);
      setLoadServicesListings(false);
    } catch (error) {
      console.log(error);
      setLoadServicesListings(false);
    }
  };

  React.useEffect(() => {
    getListings();
    setTimeout(() => {
      console.log("ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl", servicesListings);
    }, 2000);
  }, []);

  return (
    <ListingsContext.Provider
      value={{
        listings: servicesListings,
        setListings: setServicesListings,
        loadListings: loadServicesListings,
        setLoadListings: setLoadServicesListings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export { ListingsContext, ServicesProvider as ListingsProvider };
