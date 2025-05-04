import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

export default function App() {
  const [coins, setCoins] = useState([]);

  const loadData = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false"
    );
    const data = await response.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={coins}
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
                    <Text style={styles.text}>{item.symbol.toUpperCase()}</Text>
                    <Text style={styles.text}>
                      {item.price_change_percentage_24h.toFixed(2)}%
                    </Text>
                  </View>
                </View>

                <View>
              <Text style={styles.title}>
                {item.current_price.toLocaleString("en-US")} USD 
              </Text>
              <Text style={styles.text}>
                {item.market_cap_change_percentage_24h.toFixed(2)}%
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
    backgroundColor: "#121212",
    paddingTop: 50,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    marginRight: 5,
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
    padding: 15,
  },
});
