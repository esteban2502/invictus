import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'; //News Icon
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'; //Coins Icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; //Converter Icon

// Importa las pantallas
import News from "../screen/News";
import CoinsList from "../screen/Coins"; // Nueva pantalla
import Converter from "../screen/Converter";
import { Platform } from "react-native";
import Chat from "../components/Chat";
import ChatUI from "../screen/ChatIU";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <>
    { /*<Header title="Cripto" />*/}

        <Tab.Navigator
        initialRouteName="Coins"
        screenOptions={{
            tabBarActiveTintColor: "#7C3AED",
            tabBarShowLabel: false,
            tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor: '#1F0E3D'
          },
          android:{
            backgroundColor: '#1F0E3D'
          },
          default: {
            backgroundColor: '#1F0E3D',
          },
        }),
            headerShown: false,
            
        }}
    >
      
      <Tab.Screen
        name="News"
        component={News}
        options={{
       
          tabBarIcon: ({ color }) => <FontAwesome6 name="newspaper" size={24} color="white" style={{marginTop: '12px'}}  />,
        }}
        
      />
    <Tab.Screen
        name="chat"
        component={ChatUI}
        options={{
       
          tabBarIcon: ({ color }) => <MaterialIcons name="chat-bubble-outline" size={24} color="white" style={{marginTop: '12px'}}  />,
        }}
        
      />


      <Tab.Screen
        name="Coins"
        component={CoinsList}
        options={{
            tabBarIcon: ({ color}) => <FontAwesome5 name="bitcoin" size={24} color="white" style={{marginTop: '12px'}}  />
        }}
        
      />
      <Tab.Screen
        name="Converter"
        component={Converter}
        options={{
            tabBarIcon: ({ color }) => <MaterialIcons name="currency-exchange" size={24} color="white" style={{marginTop: '12px'}} />
        }}
      />
    </Tab.Navigator>
    </>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}