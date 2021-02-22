import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text,View } from 'react-native'
import {Button, Input} from '../../components/index'
import Icon from 'react-native-vector-icons/AntDesign'; 
const {width,height}=Dimensions.get("window")

const SignUp=({navigation:{goBack}})=>{
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                  <Button color="white" width={110} height={36} 
                    margin={20}
                    style={{justifyContent:"center",alignItems:"center"}}
                    icon={true}
                    onPress={()=>goBack()}
                    borderRadius={10}>
                      <View style={{flexDirection:"row",alignItems:"center"}} >
                        <Icon style={{marginRight:8}} name="arrowleft" size={26}/>
                        <Text style={{fontFamily:"Montserrat-Bold",fontSize:15}}>Sign In</Text>
                      </View>
                    </Button>
            </View>
            <View style={styles.footer}>
                <View style={styles.content}>
                    <Text style={styles.title}>Hello!</Text>
                    <Text style={styles.title}>Sign up to get started.</Text>
                    <View style={styles.content_input}>
                        <Input placeholder="Full Name" color="black" border  style={{width:width-50,padding:10}}/>
                        <Input placeholder="Email" color="black" border  style={{width:width-50,padding:10,marginTop:28,}}/>
                        <Input placeholder="Password" color="black" border  style={{width:width-50,padding:10,marginTop:28,}}/>
                        <Input placeholder="Repeat Password" color="black"  border  style={{width:width-50,padding:10,marginTop:28,}}/>
                    </View>
                    <Button style={{width:width-100,height:50,backgroundColor:"#dae012",alignItems:"center",justifyContent:"center",marginTop:50,borderRadius:15,}} textStyle={{fontFamily:"Montserrat-Bold",color:"white",fontSize:22}}>SIGN UP</Button>
                </View>
            </View>
        </SafeAreaView>
    )
};
const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        backgroundColor:"white",
    },
    header:{
        height:height*0.1,
        width:width,
        backgroundColor:"#dae012",
        borderBottomRightRadius:70,
    },
    footer:{
       backgroundColor:"white",
       width:width,
       height:0.9*height,
       backgroundColor:"#dae012",
    },
    content:{
       width:width,
       height:0.9*height,
       borderTopLeftRadius:70,
       backgroundColor:"white",
       alignItems:"center",
       padding:20,
    },
    title:{
        fontFamily:"Montserrat-Bold",
        fontSize:25,
    },
    content_input:{
        marginTop:50,
        width:width-50,
    },
    label:{
        fontFamily:"Montserrat-Regular"
    }
})
export default SignUp;