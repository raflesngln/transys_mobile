import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Image, SafeAreaView, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LoginScreen from '@screens/auth/LoginScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box, Stack, Text, VStack } from 'native-base'
import { Svg, Circle, G, Path, Line, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

// import Teamwork from '@assets/images/teamwork.svg';
import StartScreenSlide1 from '@components/svg/StartScreenSlide1';
import StartScreenSlide2 from '@components/svg/StartScreenSlide2';
import StartScreenSlide3 from '@components/svg/StartScreenSlide3';

import { useAppSelector, useAppDispatch } from '@redux/hooks'
var deviceHeight: any = Dimensions.get('window').height;
var deviceWidth: any = Dimensions.get('window').width;

interface Ilustration {
  image: string;
}
interface Slide {
  key: any;
  title: string;
  text: string;
  image: string;
  bgColor: any;
  ilustrasi: any;
}

const slides: Slide[] = [
  {
    key: 1,
    title: 'What\'s Courier applications ? ',
    text: `Get something cools with our courier.\n Lorem ipsum dolor sit amet. \n Lorem ipsum dolor sit amet`,
    image: require('@assets/images/course.png'),
    bgColor: '#4d80f7',
    ilustrasi: 'StartScreenSlide1',
  },
  {
    key: 2,
    title: 'Easy on Warehouse !',
    text: ` Dont be scaried with your goods warehouse.\n Lorem ipsum dolor sit amet. \n Lorem ipsum dolor sit amet`,
    image: require('@assets/images/course2.png'),
    bgColor: '#ffa65e',
    ilustrasi: 'StartScreenSlide2',
  },
  {
    key: 3,
    title: 'All You want is Ready !',
    text: ` Dont be scaried with your goods warehouse.\n Lorem ipsum dolor sit amet. \n Lorem ipsum dolor sit amet`,
    image: require('@assets/images/delivery.png'),
    bgColor: '#30d1ca',
    ilustrasi: 'StartScreenSlide3',
  },
];

  const StartupSCreen: React.FC = () => {
  const datalogin = useAppSelector((state) => state.login)
  const [showRealApp, setShowRealApp] = useState(false);
  const [index, setIndex] = useState(0);
  const [colorstatus, setColorstatus] = useState(slides[0].bgColor);


  const _renderItem = ({ item }: { item: Slide }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.bgColor }]}>
        <StatusBar
          animated={true}
          backgroundColor={colorstatus}
        />
        <VStack space={1} justifyContent="center" flex={1}>
          <Text style={[styles.title]}>{item.title}</Text>
          <Stack h="43%" style={{ left: '-1%' }} >
            <IlustrasiSvgFile index={1}/>
            {item.key=='1' && <StartScreenSlide1 h={deviceHeight} w={deviceWidth}/>}
            {item.key=='2' && <StartScreenSlide2 h={deviceHeight} w={deviceWidth}/>}
            {item.key=='3' && <StartScreenSlide3 h={deviceHeight} w={deviceWidth}/>}
          </Stack>
          <Text style={styles.text}>{item.text}</Text>
        </VStack>
      </View>
    );
  };
  


  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialCommunityIcons name="arrow-right" color={'#fff'} size={35} />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor={slides[2].bgColor}
        />
        <View style={styles.buttonCircle}>
          <MaterialCommunityIcons name="check" color={'#fff'} size={45} />
        </View>
      </>
    );
  };

  const _onSlideChange = (idx: number, lastIndex: number) => {
    const getSlideItems = slides[idx];
    setColorstatus(getSlideItems.bgColor)
    setIndex(idx)
  };
  const _onDone = () => {
    setShowRealApp(true);
  };


  if (datalogin.dataLogin.itHasEverLogin == true) {
    return <LoginScreen />;
  }

  if (showRealApp) {
    console.log("INI LOCAL STORAGES " + JSON.stringify(datalogin.dataLogin))
    return <LoginScreen />;
  } else {
    console.log("INI LOCAL STORAGES2 " + JSON.stringify(datalogin.dataLogin))
    return (
      <>
        <SafeAreaView style={styles.container}>
          <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} showSkipButton={true}
            renderDoneButton={() => _renderDoneButton()}
            renderNextButton={_renderNextButton}
            onSlideChange={_onSlideChange}
          />
        </SafeAreaView>
      </>
    );
  }

}

export default StartupSCreen

type ChildProps = {
  index: any;
  //  toggleState: (e: React.MouseEvent, title: string) => void;
}



const MyComponent = () => {
  return (
    <>
      <Text>Hello World!</Text>
    </>
  );
};
const MyComponent2 = () => {
  return (
    <>
      <Text>React Native is Cool!</Text>
    </>
  );
};

const componentName = ['MyComponent','MyComponent2'];

const IlustrasiSvgFile: React.FC<ChildProps> = (props) => {
  const Component = DynamicComponents[componentName[0]];
  return <Component />;
};
const DynamicComponents = {
  MyComponent,
  MyComponent2,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  title: {
    fontSize: 24,
    lineHeight: 45,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 45
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 25,
  },
  buttonCircle: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 25,
  },
});