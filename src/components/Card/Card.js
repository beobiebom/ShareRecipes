import React from "react";
import { StyleSheet, View,Text,Dimensions, ImageBackground } from "react-native";

const {width, height} = Dimensions.get ('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale (size) - size) * factor;


const styles=StyleSheet.create({
    container:{
        width:scale(240),
        height:400,
        flexDirection:"column",
        justifyContent:"flex-end",
    },
    name:{
        fontSize:25,
        fontFamily:"Montserrat-ExtraBold",
        color:"#FFF",
        textAlign:"center"
    },
    description:{
        fontSize:15,
        fontFamily:"Montserrat-ExtraBold",
        color:"#FFF",
        marginTop:10,
        textAlign:"center"
    },
    footer:{
        width:"100%",
        height:"35%",
        backgroundColor:"#ff785b",
        // borderTopLeftRadius:15,
        // borderTopRightRadius:15,
        borderRadius:30,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        paddingTop:10
    }
});

const Card=(props)=>{
    return(
        <ImageBackground style={styles.container} imageStyle={{borderRadius:15}} source={{uri:props.uri}}>
            <View style={styles.footer}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.description}>{props.description}</Text>
            </View>
        </ImageBackground>
    )
}

export default Card;