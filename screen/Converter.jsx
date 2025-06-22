import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Header } from '../components/Header';

const Converter = () => {
    const [amount, setAmount] = useState(''); //We first declare the state empty
    const [selectedCrypto, setSelectedCrypto] = useState('bitcoin'); //Bitcoin is the default crypto
    const [cryptoPrice, setCryptoPrice] = useState(0); //State variable for the currentcrypto price
    const [result, setResult] = useState(0); //Here we set the result of the convertsion
    const [cryptoList, setCryptoList] = useState([]); //Here are the list of the crypto
    const [cryptoPrices, setCryptoPrices] = useState({}); //Store all crypto prices

  useEffect(() => {
    fetchCryptoPrices(); //This is the function that fetches the crypto prices for the first and only time
  }, []);

  useEffect(() => {
    // We update the crypto price when the selected crypto changes
    if (cryptoPrices[selectedCrypto]) {
      setCryptoPrice(cryptoPrices[selectedCrypto]);
    }
  }, [selectedCrypto, cryptoPrices]);

  const fetchCryptoPrices = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,cardano,tether,xrp,bnb,solana,usdc,tron,steth,wbtc,hype,wsteth,bitcoin-cash,leo,chainlink,stellar,usds&vs_currencies=usd');
      const data = await response.json();
      setCryptoList(Object.keys(data)); //This is to extract the keys from the data
      
      // Store all prices in a separate state
      const prices = {};
      Object.keys(data).forEach(crypto => {
        prices[crypto] = data[crypto].usd;
      });
      setCryptoPrices(prices);
      
      // Set initial price for selected crypto
      if (data[selectedCrypto]) {
        setCryptoPrice(data[selectedCrypto].usd);
      }
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    }
  }

  //This function is executed when the user clicks the convert button
  const handleConvert = () => {
    if (amount && cryptoPrice > 0) {
      const calculatedResult = parseFloat(amount) * cryptoPrice; //We converted the String, and made the calculation
      setResult(calculatedResult); //Set the result in the state variable "result"
    }
  }

  const handleCryptoChange = (itemValue) => {
    setSelectedCrypto(itemValue); //Set the selected value to the state variable "selectedCrypto"
    setResult(0); // Reset result when changing crypto
  }

  const handleAmountChange = (text) => {
    setAmount(text); // Update amount
    setResult(0); // This reset the result when the amount changes
  }

  return (
    <ScrollView style={styles.container}>
      <Header title="Crypto Converter"/>
      <View style={styles.content}>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <TextInput //Next all the attributes of the input
            style={styles.searchInput}
            value={amount}
            onChangeText={handleAmountChange} //The input changes the state variable "amount"
            keyboardType="numeric" //The input is a number
            placeholder="Enter amount"
            placeholderTextColor="#FFFFFF"
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Cryptocurrency</Text>
          <Picker
            selectedValue={selectedCrypto} //The selected value is the state variable "selectedCrypto"
            onValueChange={handleCryptoChange}
            style={styles.picker}
          >
            {/* This is the list of the crypto, it itterates through the cryptoList with its key and value */}
            {cryptoList.map((crypto) => (
              <Picker.Item key={crypto} label={crypto.toUpperCase()} value={crypto} />
            ))}
          </Picker>
        </View>

        {/* Show current price */}
        {cryptoPrice > 0 && (
          <View style={styles.priceContainer}>
            <Text style={styles.currentPriceText}>
              Current {selectedCrypto.toUpperCase()} price: ${cryptoPrice.toFixed(2)} USD
            </Text>
          </View>
        )}

        {/* It calls the funtion to convert the crypto to USD */}
        <TouchableOpacity style={styles.button} onPress={handleConvert}>
          <Text style={styles.buttonText}>Convert to USD</Text>
        </TouchableOpacity>

        {result > 0 && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {/* Next is the result of the conversion with 2 decimal places */}
              {amount} {selectedCrypto.toUpperCase()} = ${result.toFixed(2)} USD 
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1B2D", 
  },
  content: {
    padding: 20,
    marginTop: 10, 
  },

  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start", 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D6C3FF", 
    marginHorizontal: 0, 
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#2A263A", 
    padding: 10,
  },
  label: {
    color: "#EDEDED", 
    marginBottom: 5,
    fontSize: 16,
    marginLeft: 0, 
  },
  searchInput: { 
    color: "#fff",
    padding: 5, 
    flex: 1,
    fontSize: 18,
    width: '100%', 
  },
  pickerContainer: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D6C3FF",
    backgroundColor: "#2A263A", //Background color of the picker
    padding: 10, 
  },
  picker: {
    color: "#EDEDED",
    backgroundColor: "#2A263A",
  },
  pickerItem: { 
    color: "#EDEDED", //Color of the coin in the picker options
    backgroundColor: "#2A263A", //Background color of the picker options
  },
  button: {
    backgroundColor: "#2A263A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#D6C3FF",
  },
  buttonText: {
    color: "#D6C3FF",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#2A263A", 
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A29CCF", 
  },
  resultText: {
    color: "#EDEDED", 
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  currentPriceText: {
    color: "#D6C3FF", 
    fontSize: 16,
    textAlign: "center",
  },
  priceContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#2A263A",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D6C3FF",
    alignItems: "center",
  },
});

export default Converter;