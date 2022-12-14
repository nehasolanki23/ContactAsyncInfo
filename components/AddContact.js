import * as React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddContact =() =>{
  const [ name, setName ] = useState('');
  const [ mobile, setMobile ] = useState('');
  const navigation = useNavigation();

  const saveContact = async () =>{
    let tempContact = [];
    let contacts = [];
    //contacts = [];
    let x = JSON.parse(await AsyncStorage.getItem('CONTACT'));
    tempContact = x??[];
    tempContact.map(item =>{
      contacts.push(item);
    });
    contacts.push({name: name, mobile: mobile })
    await AsyncStorage.setItem('CONTACT', JSON.stringify(contacts));
    navigation.goBack();
  };

  return (

    <View>

    <TextInput placeholder= "Enter Name"
    value = {name} 
    onChangeText = {txt => setName(txt)}
      style = {{
        marginTop: 50,
        height: 50,
        width: '90%',
        borderBottomWidth: 0.2,
        borderRadius: 20,
        alignSelf: 'center',
        paddingLeft: 20,
      }}
    /> 
    <TextInput placeholder= "Enter mobile number" 
    value = {mobile}
    onChangeText = {txt => setMobile(txt)}
    keyboardType = 'number-pad'
    style = {{
        marginTop: 30,
        height: 50,
        width: '90%',
        borderBottomWidth: 0.2,
        borderRadius: 20,
        alignSelf: 'center',
        paddingLeft: 20,
        keyboardType: 'number-pad',
      }}
    />

    <TouchableOpacity style ={{
      marginTop: 50,
        height: 50,
        width: '50%',
        borderRadius: 30,
        alignSelf: 'center',
        paddingLeft: 20,
        backgroundColor: 'blue',
        justifyContent: 'center',
    }}
    onPress= {() => {
      saveContact();
    }}>

    <Text style ={{color: 'white', color: 'white', fontSize: 20, fontWeight: 'bold'}}>
      Save Contact...
    </Text>

    </TouchableOpacity>
    
  </View> 

  );
}

export default AddContact;
