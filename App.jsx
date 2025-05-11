import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Header } from "./components/Header";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/navigation"; // Import the function navigation
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  
  return ( 
   <>
   <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
      <StatusBar style="light" />
    </GestureHandlerRootView>  
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
