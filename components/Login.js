import * as React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login =() =>{
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigation = useNavigation();

  const saveEmailPass = async () => {
    try{
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('PASSWORD', password);
      navigation.navigate('Contact');
    }
    catch(e)
    {
      console.log(e);
    }
  };

  return (
    <View style = {{flex: 1}}>
      <Text style ={{ alignItems: 'center', fontSize: 20, marginTop: 50, fontWeight: 'bold'}} > Login To The Contact Form
      </Text> 

      <TextInput placeholder="Enter Email id"
      value = {email}
      onChangeText ={(txt) => setEmail(txt)}
      style ={{
        width:'90%', 
        height: 50, 
        borderBottomWidth: 0.2, 
        alignSelf: 'center', 
        marginTop: 50, 
        borderRadius: 20, 
        paddingLeft: 20}} 
      />
    
      <TextInput placeholder="Enter Password"
      value = {password}
      onChangeText={txt => setPassword(txt)}
      style ={{
        width:'90%', 
        height: 50, 
        borderBottomWidth: 0.2, 
        alignSelf: 'center', 
        marginTop: 50, 
        borderRadius: 20, 
        paddingLeft: 20}} 
      />
      <TouchableOpacity style = {{
        marginTop: 50,
        height: 50,
        width: '50%',
        borderRadius: 30,
        alignSelf: 'center',
        paddingLeft: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
      }} onPress = {()=> {saveEmailPass();}}> 
      <Text style={{color: 'white',color: 'white',
        fontSize: 20,
        fontWeight: 'bold'}}>
      Login 
      </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;