import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Header } from "../components/Header";
import { TextInput } from "react-native-gesture-handler";


export default function CoinsList() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refresh, seRefresh] = useState(false);



  const loadData = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
    );
    const data = await response.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
    <Header title=""/>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="search"
          size={24}
          color="#7C3AED"
          style={styles.searchIcon}
        />
        <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#D6C3FF"
        onChangeText={text => setSearch(text)}/>
        
      </View>

      <FlatList
       refreshing={refresh}
       onRefresh={async () =>{
        seRefresh(true);
        await loadData();
        seRefresh(false);
       } }
        showsVerticalScrollIndicator={false}
        data={
          coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())) 
        }
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <View style={styles.coinContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <View style= {styles.rankContainer}>

                    <Text style={styles.rank}>{item.market_cap_rank}</Text>
                    </View>
                    <Text style={styles.text}>{item.symbol.toUpperCase()}</Text>
                    <MaterialIcons
                      name={
                        item.price_change_percentage_24h >= 0
                          ? "arrow-drop-up"
                          : "arrow-drop-down"
                      }
                      size={20}
                      color={
                        item.price_change_percentage_24h >= 0
                          ? "#4ADE80"
                          : "#F87171"
                      }
                    />

                    <Text
                      style={[
                        styles.text,
                        {
                          color:
                            item.price_change_percentage_24h < 0
                              ? "#F87171"
                              : "#4ADE80",
                        },
                      ]}
                    >
                      {item.price_change_percentage_24h.toFixed(2)} %
                    </Text>
                  </View>
                </View>

                <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
                  <Text style={styles.title}>
                    {item.current_price.toLocaleString("en-US")} US$
                  </Text>
                  <Text style={styles.text}>
                    {item.market_cap_change_percentage_24h.toFixed(2)} %
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      ></FlatList>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#121212",
    backgroundColor: "#1C1B2D",

  },
   inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D6C3FF",
    marginHorizontal: 7,
    marginTop: 10
  },

  searchInput:{
    color: "#fff",
    padding: 10,
   
    flex: 1,

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
    
  },searchIcon: {
    marginLeft: 8,
  marginRight: 8,
    zIndex: 1,
    color: "#D6C3FF",
  }
});