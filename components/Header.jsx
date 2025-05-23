import { View, StyleSheet, Text, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo vector icons

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomColor: "#7C3AED",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#EDEDED",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Sora_600SemiBold",
    marginLeft: 10, // Space between icon and title
  },
  inputSearch: {
    backgroundColor: "#2A263A",
    justifyContent: "right",
    color: "#fff",
    padding: 10,
    borderBottomColor: "#7C3AED",
    borderBottomWidth: 1,
    borderRadius: 10,
    width: "100%",
    color: "#EDEDED",
  },
});

export function Header(props) {
  
  return (
    <LinearGradient
      colors={["#2A263A", "#1C1B2D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      {props.nameIcon && (
        <Ionicons name={props.nameIcon} size={24} color="#EDEDED" style={styles.icon} />
      )}
      <Text style={styles.title}>{props.title}</Text>

     

      <View style={styles.btnSearch}></View>
    </LinearGradient>
  );
}
