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

const {width, height} = Dimensions.get ('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale (size) - size) * factor;

const DATA = [
  {
    title: 'Afro vibes',
    location: 'Mumbai, India',
    date: 'Nov 17th, 2020',
    poster: 'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
  },
  {
    title: 'Jungle Party',
    location: 'Unknown',
    date: 'Sept 3rd, 2020',
    poster: 'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
  },
  {
    title: '4th Of July',
    location: 'New York, USA',
    date: 'Oct 11th, 2020',
    poster: 'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
  },
  {
    title: 'Summer festival',
    location: 'Bucharest, Romania',
    date: 'Aug 17th, 2020',
    poster: 'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
  },
  {
    title: 'BBQ with friends',
    location: 'Prague, Czech Republic',
    date: 'Sept 11th, 2020',
    poster: 'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
  },
  {
    title: 'Festival music',
    location: 'Berlin, Germany',
    date: 'Apr 21th, 2021',
    poster: 'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
  },
  {
    title: 'Beach House',
    location: 'Liboa, Portugal',
    date: 'Aug 12th, 2020',
    poster: 'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
  },
];

const Home = () => {
  const [data, setData] = React.useState (DATA);
  const scrollXIndex = React.useRef (new Animated.Value (0)).current;
  const scrollXAnimated = React.useRef (new Animated.Value (0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback (activeIndex => {
    scrollXIndex.setValue (activeIndex);
    setIndex (activeIndex);
    //console.log("I was called")
  });

  React.useEffect (() => {
    Animated.spring (scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start ();
    console.log (scrollXAnimated);
    console.log (scrollXIndex);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="menu" size={25} />
        <View
          style={{
            width: '90%',
            height: verticalScale (40),
            borderColor: '#000',
            borderWidth: 1.5,
            borderRadius: 50,
            paddingLeft: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Input
            placeholder="Search for recipes"
            color="black"
            style={{marginTop: 0.003, width: '88%'}}
          />
          <AntDesign name="search1" size={25} />
        </View>
      </View>
      <View style={styles.body}>
        <Text
          style={{
            fontFamily: 'Montserrat-ExtraBold',
            fontSize: 30,
            letterSpacing: 2,
          }}
        >
          RECIPES
        </Text>
        <View style={{width: '100%', height: '100%', alignItems: 'flex-end'}}>
          <View
            style={{
              flexDirection: 'row',
              width: verticalScale (460),
              justifyContent: 'space-between',
              top: '41%',
              transform: [
                {translateX: -(width / 2 - scale (50))},
                {rotate: '-90deg'},
              ],
              position: 'absolute',
            }}
          >
            <Button
              width={verticalScale (150)}
              height={scale (35)}
              color="yellow"
              textStyle={{fontFamily: 'Montserrat-Bold', fontSize: 20}}
              style={{alignItems: 'center'}}
            >
              Lunch
            </Button>
            <Button
              width={verticalScale (150)}
              height={scale (35)}
              color="pink"
              textStyle={{fontFamily: 'Montserrat-Bold', fontSize: 20}}
              style={{alignItems: 'center'}}
            >
              Dinner
            </Button>
            <Button
              width={verticalScale (150)}
              height={scale (35)}
              color="red"
              textStyle={{fontFamily: 'Montserrat-Bold', fontSize: 20}}
              style={{alignItems: 'center'}}
            >
              Breakfast
            </Button>
          </View>
          <FlingGestureHandler
      key='left'
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key='right'
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
          <View
            style={{
              width: scale (290),
              height: verticalScale (455),
              marginTop: verticalScale (5),
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
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [style, {zIndex: data.length - index}];
                return (
                  <View style={newStyle} index={index} {...props}>
                    {children}
                  </View>
                );
              }}
              renderItem={({item, index}) => {
                // console.log(scrollXIndex)
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
                    <Image
                      source={{uri: item.poster}}
                      style={{
                        width: scale (240),
                        height: verticalScale (455),
                      }}
                    />
                  </Animated.View>
                );
              }}
            />
          </View>
           </FlingGestureHandler>
    </FlingGestureHandler>
        </View>
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
    padding: 5,
  },
  header: {
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:"yellow"
  },
  body: {
    height: '80%',
    //  backgroundColor:"green",
  },
});
export default Home;
