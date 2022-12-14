import * as React from 'react';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Intro = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      //navigation.navigate('Contact');
      checkLogin();
    }, 3000);
  }, []);

  const checkLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    const pass = await AsyncStorage.getItem('PASSWORD');
    if( email !== null || email !== undefined || email !== '')
    {
      navigation.navigate('Contact');
    }
    else{
      navigation.navigate('Login');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'red', fontSize: 20 }}> MY ContactList App! </Text>
    </View>
  );
};

export default Intro;
