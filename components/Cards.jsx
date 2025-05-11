import react from 'react';
import { View, Text, StyleSheet, Image } from "react-native";



export default function NewsItem(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#31175E', // Tu tono elegante
    borderRadius: 30,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#C4A560', // Acento dorado
    marginTop: 5,
    textAlign: 'center',
  },
});
