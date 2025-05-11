import { View,Text } from "react-native";
import react from "react";
import NewsItem from '../components/Cards'
import { Header } from "../components/Header";

export default function News() {
    return(
        <View>
            <Header title= "" />
            <View>
            <NewsItem 
            title="Bitcoin Hits New All-Time High" 
            description="Bitcoin has reached a new all-time high"
            />  
            <NewsItem 
            title="Bitcoin Hits New All-Time High" 
            description="Bitcoin has reached a new all-time high"
            />r
            <NewsItem 
            title="Bitcoin Hits New All-Time High" 
            description="Bitcoin has reached a new all-time high"
            />    

            </View>
            
        </View>
    );
}