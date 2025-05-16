import react from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function NewsItem(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: props.imageUrl }}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={3}>{props.title}</Text>
          <Text style={styles.description} numberOfLines={3}>{props.description}</Text>
        </View>
        {/* ELIMINAMOS ESTA LÍNEA */}
        {/* <Text style={styles.buttonText}>Ver más</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E1D30',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 10,
    maxHeight: 60, // Ajusta este valor según la altura máxima que desees (en puntos)
    overflow: 'hidden', // Oculta el texto que excede la maxHeight
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#44415E',
    marginLeft: 15,
  },
});