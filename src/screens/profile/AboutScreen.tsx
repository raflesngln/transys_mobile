import React  from 'react';
import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';


const AboutScreen = () => {
  const navigation = useNavigation();



  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <Text style={styles.sectionTitle}>ABOUT APPLICATION</Text>
    </View>
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
    color:'blue'
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

export default AboutScreen;
