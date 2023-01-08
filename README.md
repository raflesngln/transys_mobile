# Transys Mobile Application
- git clone 
- yarn install
- Edit android/app/build.gradle ( NOT android/build.gradle ) and add the following:
   apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
- react-native-asset
- cd android && gradlew clean OR  cd android && chmod +x gradlew
- cd ..
- react-native-asset
- yarn start --reset-cache
- npm run android