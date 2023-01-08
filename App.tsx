/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { Box, VStack } from 'native-base';
import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomePage from '@screens/home/HomePage';
import RootNavigator from '@navigation/index';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react';

import {persistor, store } from './src/redux/store'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: isDarkMode ? '#0e809b' : Colors.lighter,
  };

  // return (
  //   <>
  //     <StatusBar
  //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //       backgroundColor={backgroundStyle.backgroundColor}
  //     />
  //     {/* <HomePage/> */}
  //     <RootNavigator/>
  //   </>
  // );

  return (
    <>
    <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    <Provider store={store}>
      {/* <QueryClientProvider client={my_queryClient}> */}
        <PersistGate loading={null} persistor={persistor}>
          {/* <NativeBaseProvider theme={mytheme}> */}
            <RootNavigator />
            {/* <Text>{JSON.stringify(mytheme)}</Text> */}
          {/* </NativeBaseProvider> */}
        </PersistGate>
        {/* </QueryClientProvider> */}
    </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;