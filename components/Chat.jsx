import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { KeyboardAvoidingView, Platform } from "react-native";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "";

  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = "hello! ";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);
      showMessage({
        message: "Welcome to Chat",
        description: text,
        backgroundColor: "#23234a",
        color: "#D6C3FF",
        type: "info",
        icon: "info",
        duration: 2000,
      });
      setMessages([
        {
          text,
          user: false,
        },
      ]);
    };

    startChat();
  }, []);

  const sendMessage = async () => {
    setLoading(true);
    const userMessage = { text: userInput, user: true };

    setMessages((prev) => [...prev, userMessage]);

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    setMessages((prev) => [...prev, { text, user: false }]);

    setLoading(false);
    setUserInput("");
  };

  const ClearMessage = () => {
    setMessages("");
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user && styles.userMessageContainer,
      ]}
    >
      <Text style={[styles.messageText, item.user ? styles.userMessage : null]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      {loading && (
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <ActivityIndicator size="small" color="#6C47FF" />
          <Text style={{ color: "#D6C3FF", marginTop: 5 }}>Thinking...</Text>
        </View>
      )}

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.text}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message"
            onChangeText={setUserInput}
            value={userInput}
            onSubmitEditing={sendMessage}
            style={styles.input}
            placeholderTextColor="#fff"
          />

          <TouchableOpacity
            onPress={sendMessage}
            style={styles.sendButton}
            disabled={loading || userInput.trim() === ""}
          >
            <MaterialIcons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181829", marginTop: 50 },
  messageContainer: {
    marginVertical: 6,
    marginHorizontal: 10,
    maxWidth: "80%",
    alignSelf: "flex-start",
    backgroundColor: "#23234a",
    borderRadius: 18,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: "#6C47FF",
    alignSelf: "flex-end",
  },
  messageText: { fontSize: 16, color: "#fff" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#23234a",
    borderTopWidth: 1,
    borderTopColor: "#2e2e4d",
  },
  userMessageContainer: {
    backgroundColor: "#6C47FF",
    alignSelf: "flex-end",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
  },
  sendButton: {
    backgroundColor: "#6C47FF",
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: "#29294d",
    borderRadius: 20,
    height: 48,
    color: "white",
    borderWidth: 1,
    borderColor: "#6C47FF",
    marginRight: 8,
  },
  micIcon: {
    padding: 10,
    backgroundColor: "#6C47FF",
    borderRadius: 25,
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  stopIcon: {
    padding: 10,
    backgroundColor: "#FF4B4B",
    borderRadius: 25,
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
  },
});

export default Chat;
