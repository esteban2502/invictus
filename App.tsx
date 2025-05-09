import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Header } from "./components/Header";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/navigation"; // Import the function navigation

export default function App() {
  const [coins, setCoins] = useState([]);

  const loadData = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false"
    );
    const data = await response.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return ( 
   <>
      <Navigation />
      <StatusBar style="light" />
    </>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#121212",
    backgroundColor: "#1C1B2D",
    
  },

  title: {
    // color: "#fff",
    color: "#EDEDED",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    color: "#fff",
    marginRight: 5,
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#A29CCF",
    padding: 15,
    backgroundColor: "	#2A263A",
    alignItems: "center",
  },
  rank:{
    fontWeight: "bold",
    color: "#EDEDED",
   
    
  },
  rankContainer:{
    marginRight: 5,
    backgroundColor: "#7C3AED",
    paddingHorizontal: 5,
    borderRadius: 5,
    
  }
});
