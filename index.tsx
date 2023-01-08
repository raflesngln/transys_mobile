/**
 * @format
 */

import { QueryClientProvider,QueryClient,focusManager } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import {Platform,AppState,AppRegistry} from 'react-native';
import type { AppStateStatus } from "react-native"
import { NativeBaseProvider,extendTheme, Text, Box } from "native-base";

import App from './App';
import {name as appName} from './app.json';


// import { useAppState } from '@hooks/useAppState';
// import { useOnlineManager } from '@hooks/useOnlineManager';

// ==========REACT QUERY=============
const queryClientConfig = {
    defaultOptions: {
      queries: {
        retry: 2,
        refetchOnMount: true,
        refetchOnWindowFocus:'always',
        refetchOnReconnect:true,
        // cacheTime: 1000*300, //30 seconds
        // refetchInterval: 1000*600, //in seconds count
        // refetchIntervalInBackground: false,
        // suspense: false,
        // staleTime: 60,
        // retryDelay: 60
      },
      mutations: {
        retry: 2,
      },
    }
  }

  const customTheme = extendTheme({
    space: {
      'space-2': '29px',
    },
    components: {
      Button: {
        variants: {
          brand: {
            p: '10',
            bg: 'brand.500',
          },
        },
      },
    },
  });

  
  function onAppStateChange(status: AppStateStatus) {
    // React Query already supports in web browser refetch on window focus by default
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  const my_queryClient:any = new QueryClient(queryClientConfig)
  
function Pages(): JSX.Element{
  // useOnlineManager();
  // useAppState(onAppStateChange);
  const config = {
    initialColorMode: 'light' // initial color mode light or dark
  };
  
  const mytheme:any = extendTheme({ config });

  useEffect(() => {
    console.log('Koneksi ke reactquerYYYY')
    const subscription = AppState.addEventListener('change', onAppStateChange)
    return () => subscription.remove()
  }, [])

    return(
      <NativeBaseProvider theme={mytheme}>
        <QueryClientProvider client={my_queryClient}>
            <App />
        </QueryClientProvider>
    </NativeBaseProvider>
    )
}

AppRegistry.registerComponent(appName, () => Pages);