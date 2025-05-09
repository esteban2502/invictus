import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Fontisto from '@expo/vector-icons/Fontisto';




const styles = StyleSheet.create({

    header: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderBottomColor: '#7C3AED',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      title: {
        color: '#EDEDED',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Sora_600SemiBold',
      },
      btnSearch:{
        padding: 10,
        borderRadius: 100,
      }
})


export function Header(props:{title:string}){
    return(
    <LinearGradient
      colors={['#2A263A', '#1C1B2D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
    <Text style={styles.title}>
        {props.title}
    </Text>
    <View style={styles.btnSearch}>

    <Fontisto   name="search" size={20} color="white" />
    </View>
    </LinearGradient>
    );
}