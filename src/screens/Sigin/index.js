import React from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, Text,View } from 'react-native'
import {Button, Input} from '../../components/index'
import Icon from 'react-native-vector-icons/AntDesign'; 
import FontAweSome from 'react-native-vector-icons/FontAwesome'
import {Formik} from 'formik'
import {SignInRequest,Storage} from '../../utils/index'
import {AuthContext} from '../../authContext/AuthContext'
import * as yup from 'yup'

const {width,height}=Dimensions.get("window")

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;


const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const SignIn=({navigation})=>{
    const {signIn}=React.useContext(AuthContext);
    const [secureState,setSecureSate]=React.useState(true);
    const [errorValue,setErrorValue]=React.useState({
        email:"",
        password:"",
        
    });
    

    const SignupSchema=yup.object().shape({
        email:yup.string().email("That isn't an email").min(1).required("Email is required"),
        password:yup.string().min(8,"Password is at least 8 character").required("Password is required"),
    })
    const onSignIn= async (values,errors)=>{
        if((errors.email===undefined)&&(errors.password===undefined)){
            if((values.email.length==0)&&(values.password.length==0)){
                setErrorValue({
                    email:"Email is required",
                    password:"Password is required",
                })
            }
            else{
                setErrorValue({
                    email:"",
                    password:"",
                })
                await SignInRequest(values).then((res)=>{
                    Storage.saveToken(res.user.uid)
                    signIn(res.user.uid)
                }).catch((err)=>{
                    setErrorValue({
                        email:"",
                        password:"Email or password is incorrect",
                    })
                    console.log(err)
                })
            }
        }else{
             setErrorValue({
                    email:errors.email,
                    password:errors.password,
                })
        }
    }
    
    return(
        <Formik initialValues={{
                email:"",
                password:"",
            }}
                validationSchema={SignupSchema}
            >
            {(props)=>(
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}></View>
                    <View style={styles.body}>
                        <View style={styles.boxSignIn}>
                            <Text style={styles.title}>SIGN IN</Text>
                            <Input placeholder="Email" color="black" border value={props.values.email} onChangeText={props.handleChange("email")} 
                            style={[styles.input,{marginTop:verticalScale(25)}]}/>
                            {/* <View style={{marginTop:verticalScale(8),flexDirection:"row",justifyContent:"flex-start",width:scale(270)}}> */}
                                <Text style={styles.errorText}>{errorValue.email}</Text>
                            {/* </View> */}
                            <Input placeholder="Password"
                            color="black" border value={props.values.password}
                            onChangeText={props.handleChange("password")} 
                            secureTextEntry={true}
                            style={[styles.input,{marginTop:verticalScale(16)}]}/>
                            <Text style={styles.errorText}>{errorValue.password}</Text>
                            <View style={styles.forgotContainer}>
                                <Text style={styles.forgotText}>Forgot password?</Text>
                                <Button color="white" width={scale(100)} height={verticalScale(40)} 
                                style={{justifyContent:"center",alignItems:"center"}}
                                icon={true}
                                onPress={()=>onSignIn(props.values,props.errors)}
                                borderRadius={10}>
                                <View style={{flexDirection:"row",alignItems:"center"}} >
                                    <Text style={{fontFamily:"Montserrat-Bold",fontSize:moderateScale(16)}}>Sign In</Text>
                                    <Icon style={{marginLeft:8}} name="arrowright" size={moderateScale(25)}/>
                                </View>
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.textFooter}>
                            Or sign in using social media
                        </Text>
                        <View style={styles.FBGGContainer}>
                            <Button width={134} height={43} color="#249EF0"
                                style={{justifyContent:"center",alignItems:"center"}}
                                borderRadius={5}
                                icon={true}
                            >
                                <View style={{flexDirection:"row",alignItems:"center"}} >
                                    <Text style={[styles.FBGGText,{color:"white"}]}>Facebook</Text>
                                    <FontAweSome name="facebook" style={{marginLeft:scale(10)}} size={moderateScale(19)} color="white"/>
                                </View>
                            </Button>
                            <Button width={134} height={43} color="white"
                                borderRadius={5}
                                border
                                style={{justifyContent:"center",alignItems:"center"}}
                                icon={true}
                            >
                                <View style={{flexDirection:"row",alignItems:"center"}} >
                                    <Text style={[styles.FBGGText,{color:"#249EF0"}]}>Google</Text>
                                    <Image source={require("../../assets/image/icons8-google-48.png")} style={{width:scale(24),height:verticalScale(24),marginLeft:scale(10)}} />
                                </View>
                            </Button>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center",marginTop:verticalScale(28),}}>
                            <Text style={[styles.textFooter]}>Don’t have an account? </Text>
                            <Button textStyle={{fontFamily:"Montserrat-Bold",color:"red",fontSize:moderateScale(16)}} onPress={()=>navigation.navigate("SignUp")} >Sign Up</Button>
                        </View>
                    </View>
                </SafeAreaView>
            )}
            </Formik>
    )
};
const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        backgroundColor:"#FFFFFF"
    },
    header:{
        flex:1,
    },
    body:{
        flex:2.2,
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
    },
    footer:{
        flex:1,
        alignItems:"center",
        width:"100%",
    },
    boxSignIn:{
        width:scale(320),
        height:verticalScale(330),
        backgroundColor:"#dae012",
        borderRadius:20,
        alignItems:"center"
    },
    title:{
        color:"#FFF",
        fontFamily:"Montserrat-Bold",
        fontSize:moderateScale(30),
        marginTop:verticalScale(24)
    },
    input:{
        width:scale(280),
        padding:10,
    },
    errorText:{
        color:"red",
        fontFamily:"Montserrat-Regular",
        fontSize:moderateScale(12),
        width:310,
        marginTop:verticalScale(5),
        textAlign:"left"
    },
    forgotText:{
        color:"red",
        fontFamily:"Montserrat-Regular",
        fontSize:moderateScale(12),
        fontWeight:"bold"
    },
    forgotContainer:{
        width:scale(280),
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:verticalScale(32),
        alignItems:"flex-end"
    },
    textFooter:{
        fontSize:moderateScale(16),
        fontFamily:"Montserrat-Regular",
    },
    FBGGContainer:{
        width:"88%",
        marginTop:verticalScale(20),   
        flexDirection:"row",
        justifyContent:"space-between"
    },
    FBGGText:{
        fontFamily:"Montserrat-Bold",
        fontSize:moderateScale(16),
        fontFamily:"Montserrat-Bold",
        fontSize:moderateScale(16),
    }
})
export default SignIn;