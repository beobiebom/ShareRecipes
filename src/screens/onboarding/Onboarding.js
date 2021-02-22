import React, { useRef, useState } from 'react';
import { Dimensions,View,StyleSheet,Image, SafeAreaView ,Text, ScrollView} from 'react-native';
import Subslide from './Subslide';


const {height,width}=Dimensions.get("window");
const SLIDE_HEIGHT=0.6*height;
const slides=[
    {
        title:"DISCOVER",
        description:"Discover our recipes and pick whatever you need",
        image:{
            src:require("../../assets/image/onboarding1.png"),
            width:width-20,
            height:366
        },
    },
    {
        title:"PREPARATION",
        description:"Discover our recipes and pick whatever you need",
        image:{
            src:require("../../assets/image/onboarding2.png"),
            width:width-20,
            height:366
        },
    },
    {
        title:"COOKING",
        description:"Discover our recipes and pick whatever you need",
        image:{
            src:require("../../assets/image/onboarding3.png"),
            width:width-20,
            height:339
        },
    },
];
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFFFFF"
    },
    underlay:{
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden'
    },
    footer:{
        flex:1,
        flexDirection:"row",
        width:width,
        alignItems:"center"
    },
});


const Onboarding=({navigation})=>{ 
    const scroll=useRef(null)
    const [x,setX]=useState(0);
    
    

    const handleScroll=(e)=>{
        setX(e.nativeEvent.contentOffset.x)
    }

    return(
    <SafeAreaView style={styles.container}>
        <View style={{height:SLIDE_HEIGHT}}>
            <ScrollView horizontal snapToInterval={width}
                decelerationRate="fast"
                ref={scroll}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={handleScroll}
                scrollEventThrottle={1}
            >
            {slides.map(({image},index)=>{
                return(
                    <View style={styles.underlay}   key={index}>
                    <Image source={image.src} 
                    style={{width:width,height:image.height}} />
                    </View>
                )
            })}
            </ScrollView>
        </View>
        <View style={styles.footer}>
          <View style={{backgroundColor:"#FCF8E8",width:width-50,height:0.4*height-40,borderRadius:10,position:'absolute',marginHorizontal:50/2}}></View>
          <View style={{flex:1,}}>
            <View
                    style={{
                        flex:1,
                        flexDirection: "row",
                        width: width * slides.length,
                        transform: [{translateX:x*-1}],
                        alignItems:"center"
                    }}
                    >
                    {slides.map(({title,description},index)=>{
                                return(
                                    <Subslide scroll={scroll} onPress={()=>{scroll.current.scrollTo({ x: width * (index + 1), animated: true })}} key={index} title={title} description={description} index={index}/>
                                )
                        })}                    
            </View>
          </View>
        </View>
    </SafeAreaView>
    );
}
export default Onboarding;