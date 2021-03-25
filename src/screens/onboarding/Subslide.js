import React from 'react';
import {View,Text,Dimensions, StyleSheet} from 'react-native';
import {Button} from '../../components/index'
import {AuthContext} from '../../authContext/AuthContext'

const {height,width}=Dimensions.get("window");

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        height:0.4*height-40,
        paddingHorizontal:40
    },
    title:{
        fontSize:30,
        fontFamily:"Montserrat-ExtraBold",
        textAlign:'center',
    },
    description:{
        fontSize:20,
        fontFamily:"Montserrat-Regular",
        textAlign:'center',
        paddingTop:20,
    },
    rowButton:{
        justifyContent:"space-between",
        flexDirection:'row',
        marginTop:50
    },
})

const Subslide=({title,description,index,onPress,scroll})=>{
  const {authContext}=React.useContext(AuthContext);
    let content=(
        <View style={styles.rowButton}>
                <Button color="#FFC530" borderRadius={10} width={52} height={44} textStyle={{textAlign:"center",color:"white",fontSize:15,fontFamily:"Montserrat-Bold"}} style={{justifyContent:"center"}} onPress={()=>{scroll.current.scrollTo({ x: width * (index-1) , animated: true })}} >Prev</Button>
                <Button color="#FFC530" borderRadius={10} width={52} height={44}  textStyle={{textAlign:"center",color:"white",fontSize:15,fontFamily:"Montserrat-Bold"}} style={{justifyContent:"center"}}  {...{onPress}} >Next</Button>
        </View> 
    );
    if(index==0){
        content=(   
            <View style={[styles.rowButton,{justifyContent:"center"}]}>
                <Button color="#FFC530" borderRadius={10} width={100} height={44}  textStyle={{textAlign:"center",color:"white",fontSize:15,fontFamily:"Montserrat-Bold"}} style={{justifyContent:"center"}} {...{onPress}}  >Next</Button>
            </View> 
        )
    }
    if(index==2){
        content=(
            <View style={styles.rowButton}>
                    <Button color="#FFC530" borderRadius={10} width={52} height={44} textStyle={{textAlign:"center",color:"white",fontSize:15,fontFamily:"Montserrat-Bold"}} style={{justifyContent:"center"}} onPress={()=>{scroll.current.scrollTo({ x: width * (index-1) , animated: true })}} >Prev</Button>
                    <Button color="#FFC530" borderRadius={10} width={100} height={44}  textStyle={{textAlign:"center",color:"white",fontSize:15,fontFamily:"Montserrat-Bold"}} style={{justifyContent:"center"}}  onPress={()=>{authContext.getStarted()}} >Get started</Button>
            </View> 
        )
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title} >{title}</Text>
            <Text style={styles.description}>{description}</Text>
            {content}
        </View>
    );
}
export default Subslide;