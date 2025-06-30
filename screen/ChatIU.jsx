import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import Chat from "../components/Chat";
import { Header } from "../components/Header";

export default function ChatUI() {
  return (
    <View style={styles.container}>
      <Header title="Assesor AI" />

      <Chat />
      <FlashMessage position={"top"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181829",
  },
});
