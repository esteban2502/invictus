import { View,Text } from "react-native";
import react from "react";
import NewsItem from '../components/Cards'

export default function News() {
    return(
        
        <View>
            <NewsItem 
            title="Bitcoin Hits New All-Time High" 
            description="Bitcoin has reached a new all-time high"
            />  
            <NewsItem 
            title="Bitcoin Hits New All-Time High" 
            description="Bitcoin has reached a new all-time high"
            />
            <NewsItem 
            title="Bitcoin Hits New All-Time High" 
            description="Bitcoin has reached a new all-time high"
            />    
            
        </View>
    );
}