# Transys Mobile Application
- git clone project
- yarn install
- 📄 Edit android/app/build.gradle ( NOT android/build.gradle ) and add the following:
  ```
   apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
   ```
- react-native-asset
- ``` cd android && gradlew clean OR  cd android && chmod +x gradlew ```
- cd ..
- ``` react-native-asset ```
- ``` yarn start --reset-cache ```
- ``` npm run android ```



## Tips & trik tools settings

create apps:
npx react-native init AwesomeTSProject
OR
npx react-native init AwesomeTSProject --template react-native-template-typescript

Check Error Code ESlint =>    yarn tsc
checking Modules code is warning error=> tsc --traceResolution

 react-native run-android --deviceId=3201f6c7ec0a161f

## Clean project
- 📁 cd android && gradlew clean ||  cd android && chmod +x gradlew
- yarn start --reset-cache

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="aaa"
    xmlns:tools="http://schemas.android.com/tools">
```
-gradle build --warning-mode=all



- instal react-navigation=> https://reactnavigation.org/docs/getting-started

## React native icon and assets and font in react native with 
- instal react-native-vector-icons
  ``` yarn add react-native-vector-icons ```
- 📁 Edit android/app/build.gradle ( NOT android/build.gradle ) and add the following:
   ```
  apply from: "../../node_modules/react-native-vector-icons/fonts.gradle" 
  ```
- run cmd in project : react-native-asset
- cd android && gradlew clean
- and run again : react-native-asset and run gradele clean again


## Setup Path Alias/dynamic module folder in a React Native
 Documentasi: https://reactnative.dev/docs/typescript#adding-typescript-to-an-existing-project

- Install module resolver => yarn add --dev babel-plugin-module-resolver
- 📄 ganti nama index.js menjadi index.tsx
- 📄 buat file tsconfig.json
 // tsconfig.json
 ```
{
  "extends": "@tsconfig/react-native/tsconfig.json" /* Recommended React Native TSConfig base */,
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ],
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Completeness */
    "skipLibCheck": true,
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["es6"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext",
    // Path alias config
    "baseUrl": ".",
    "paths": {
      "*": ["src/*"],
      "tests": ["__tests__/*"],
      "@components/*": ["src/components/*"],
      "@redux/*": ["src/redux/*"]
    }
  }
}
```
- 📄 Buat file babel.config.js

```
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@redux': './src/redux',
        },
      },
    ],
  ],
};
```
- 📄 Buat file jest.config.js
```
	module.exports = {
  		preset: 'react-native',
  		moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	};
   ```
-  run command to reset chached => yarn start --reset-cache
- DONE !

## React Native Firebase 
-Instal Packet
    yarn add @react-native-firebase/app
    yarn add @react-native-firebase/auth
    yarn add @react-native-firebase/messaging
- Create Project in google console => https://console.firebase.google.com and download file google-services.json
-place google-services.json to folder path android\app 
- 📄 edit file android/build.gradle and add 
    ```
    dependencies {
        classpath 'com.google.gms:google-services:4.3.13'
    }
    ```
- 📄 edit file android/app/build.gradle and add code: 
  ````
  apply plugin: "com.google.gms.google-services"
	dependencies {
    		implementation platform('com.google.firebase:firebase-bom:31.1.1')
	}
   ```
- Clean project 
  ``` cd android && gradlew clean ```
- Reset Project
  ``` yarn start --reset-cache ```
- DONE !


## Create File Debug Running On other devices 
- run command => 
  ``` npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res 
  ```
- then run => 
  ```
  cd android && gradlew assembleDebug
  ```
	For Linux and Mac OSX:
  ```
	./gradlew assembleRelease
  ```
- https://instamobile.io/android-development/generate-react-native-release-build-android/


#### ==============================STYLES===============================
Glass background combination = back :0960d9,   front =>'#438cf075'


## NOTIFICATIONS

local Notifications => 
- yarn add @notifee/react-native
- react-native-notifications


## library2 :
- react-native-svg
- react-native-image-progress
- react-native-document-picker
- react-native-sticky-parallax-header
- react-native-app-intro-slider
- React Native Reanimated
- @shopify/flash-list
- react-native-copilot
- notifee
- react-native-fingerprint-scanner
- 