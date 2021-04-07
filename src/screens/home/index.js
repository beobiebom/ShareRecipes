import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {Button, Input} from '../../components/index';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import {
  fetchRecipes
} from "../../utils/index"
import Card from "../../components/Card/Card";
import {AuthContext} from "../../authContext/AuthContext"

const {width, height} = Dimensions.get ('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale (size) - size) * factor;


const Home = () => {
  const [data, setData] = React.useState ();
  const scrollXIndex = React.useRef (new Animated.Value (0)).current;
  const scrollXAnimated = React.useRef (new Animated.Value (0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback (activeIndex => {
    scrollXIndex.setValue (activeIndex);
    setIndex (activeIndex);
    //console.log("I was called")
  });
  const {initialState}=React.useContext(AuthContext);
  React.useEffect(()=>{
    fetchRecipes().then((value)=>{
      setData(value);
      initialState.data_Recipes=value;
    })
  },[])

  React.useEffect (() => {
    Animated.spring (scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
      speed:2,
    }).start ();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="search1" size={25}  />
        <Feather name="menu" size={25} style={{marginLeft:30}} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title} >RECIPES</Text>
        <View style={{width: '100%', height: '92%',position:"relative"}}>
          <View
            style={{
              flexDirection: 'row',
              width: verticalScale (430),
              top: '37%',
              transform: [
                {translateX: -(width / 2)},
                {rotate: '-90deg'},
              ],
              position: 'absolute', 
            }}
          >
            <Button
              width={verticalScale (120)}
              height={scale (35)}
              borderRadius={15}
              color="pink"
              textStyle={{fontFamily: 'Montserrat-Bold', fontSize: moderateScale(18), color:"white"}}
              style={{flexDirection:"row", alignItems: 'center',justifyContent:"center"}}
            >
              Dinner
            </Button>
            <Button
              width={verticalScale (120)}
              height={scale (35)}
              borderRadius={15}
              color="yellow"
              textStyle={{fontFamily: 'Montserrat-Bold', fontSize: moderateScale(18),color:"white"}}
              style={{flexDirection:"row", alignItems: 'center',justifyContent:"center",marginLeft:10}}
            >
              Lunch
            </Button>
            <Button
              width={verticalScale (120)}
              height={scale (35)}
              borderRadius={15}
              color="red"
              textStyle={{fontFamily: 'Montserrat-Bold', fontSize: moderateScale(18),color:"white"}}
              style={{flexDirection:"row", alignItems: 'center',justifyContent:"center",marginLeft:10}}
            >
              Breakfast
            </Button>
          </View>
          <FlingGestureHandler
            key="left"
            direction={Directions.LEFT}
            onHandlerStateChange={ev => {
              if (ev.nativeEvent.state === State.END) {
                if (index === data.length - 1) {
                  return;
                }
                setActiveIndex (index + 1);
              }
            }}
          >
            <FlingGestureHandler
              key="right"
              direction={Directions.RIGHT}
              onHandlerStateChange={ev => {
                if (ev.nativeEvent.state === State.END) {
                  if (index === 0) {
                    return;
                  }
                  setActiveIndex (index - 1);
                }
              }}
            >
              <View
                style={{
                  width: scale (290),
                  height: verticalScale (455),
                  marginLeft: scale (50),
                  // marginTop:verticalScale(5),
                }}
              >
                <FlatList
                  data={data}
                  keyExtractor={(_, index) => String (index)}
                  horizontal
                  inverted
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                  scrollEnabled={false}
                  removeClippedSubviews={false}
                  CellRendererComponent={({item, index, children, style, ...props}) => {
                    const newStyle = [style, {zIndex: data.length - index}];
                    return (
                      <View style={newStyle} index={index} {...props}>
                        {children}
                      </View>
                    );
                  }}
                  renderItem={({item, index}) => {
                    const inputRange = [index - 1, index, index + 1];
                    const translateX = scrollXAnimated.interpolate ({
                      inputRange,
                      outputRange: [50, 0, -100],
                    });
                    const scaleImg = scrollXAnimated.interpolate ({
                      inputRange,
                      outputRange: [0.8, 1, 1.3],
                    });
                    const opacity = scrollXAnimated.interpolate ({
                      inputRange,
                      outputRange: [1 - 1 / 3, 1, 0],
                    });
                    return (
                      <Animated.View
                        style={{
                          position: 'absolute',
                          left: -scale (200) / 2,
                          opacity,
                          transform: [
                            {
                              translateX,
                            },
                            {scale: scaleImg},
                          ],
                        }}
                      >
                        <Card name={item.name} uri={item.link} description={item.description} />
                      </Animated.View>
                    );
                  }}
                />
              </View>
            </FlingGestureHandler>
          </FlingGestureHandler>
        </View>
      </View>
      <View>

      </View>
    </SafeAreaView>
  );
};
// ,transform:[{translateY:verticalScale(180)},{translateX:- (width/2-scale(28))},{rotate:"-90deg"}],position:"absolute"
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: moderateScale(5),
  },
  header: {
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"flex-end",
    paddingRight:scale(10),
  },
  body: {
    height: '78%',
    width:"100%",
  },
  searchBox:{
    width: '90%',
    height: "80%",
    borderColor: '#000',
    borderWidth: 1.5,
    borderRadius: 50,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title:{
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: moderateScale(30),
    letterSpacing: 2,
  }
});
export default Home;


// <FlingGestureHandler
//   key="left"
//   direction={Directions.LEFT}
//   onHandlerStateChange={ev => {
//     if (ev.nativeEvent.state === State.END) {
//       if (index === data.length - 1) {
//         return;
//       }
//       setActiveIndex (index + 1);
//     }
//   }}
// >
//   <FlingGestureHandler
//     key="right"
//     direction={Directions.RIGHT}
//     onHandlerStateChange={ev => {
//       if (ev.nativeEvent.state === State.END) {
//         if (index === 0) {
//           return;
//         }
//         setActiveIndex (index - 1);
//       }
//     }}
//   >
//     <View
//       style={{
//         width: scale (290),
//         height: verticalScale (455),
//         marginLeft: scale (50),
//       }}
//     >
//       <FlatList
//         data={data}
//         keyExtractor={(_, index) => String (index)}
//         horizontal
//         inverted
//         contentContainerStyle={{
//           flex: 1,
//           justifyContent: 'center',
//         }}
//         scrollEnabled={false}
//         removeClippedSubviews={false}
//         CellRendererComponent={({item, index, children, style, ...props}) => {
//           const newStyle = [style, {zIndex: data.length - index}];
//           return (
//             <View style={newStyle} index={index} {...props}>
//               {children}
//             </View>
//           );
//         }}
//         renderItem={({item, index}) => {
//           const inputRange = [index - 1, index, index + 1];

//           const translateX = scrollXAnimated.interpolate ({
//             inputRange,
//             outputRange: [50, 0, -100],
//           });
//           const scaleImg = scrollXAnimated.interpolate ({
//             inputRange,
//             outputRange: [0.8, 1, 1.3],
//           });
//           const opacity = scrollXAnimated.interpolate ({
//             inputRange,
//             outputRange: [1 - 1 / 3, 1, 0],
//           });

//           return (
//             <Animated.View
//               style={{
//                 position: 'absolute',
//                 left: -scale (200) / 2,
//                 opacity,
//                 transform: [
//                   {
//                     translateX,
//                   },
//                   {scale: scaleImg},
//                 ],
//               }}
//             >
//               <Card />
//               <Image
//                 source={{uri: item.poster}}
//                 style={{
//                   width: scale (240),
//                   height: verticalScale (455),
//                 }}
//               />
//             </Animated.View>
//           );
//         }}
//       />
//     </View>
//   </FlingGestureHandler>
// </FlingGestureHandler>;
