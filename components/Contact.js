import * as React from 'react';
import { Text, View, TouchableOpacity, FlatList} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Login';

const Contact =() =>{
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [ contactList, setContactList ] = useState([]);

  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    //const email = await AsyncStorage.getItem('EMAIL');
    //const pass = await AsyncStorage.getItem('PASSWORD');
    //console.log(email + '' + pass);
    const contactsS = await AsyncStorage.getItem('CONTACT');
    console.log(JSON.parse(contactsS));

    setContactList(JSON.parse(contactsS));
  };

  const deleteContact = async index =>{
    const tempData = contactList;

    const selectedData = tempData.filter((item, ind) => {
      return ind != index;
    });
    setContactList(selectedData);
    await AsyncStorage.setItem('CONTACT', JSON.stringify(selectedData));
  };

  const logout = async () =>{
    await AsyncStorage.setItem('EMAIL', '');
    await AsyncStorage.setItem('PASSWORD', '');
    navigation.navigate('Login');
  };

  return (
      <View style ={{ flex: 1}}>
      <Text style = {{alignItems: 'center', fontSize: 20, marginTop: 50, fontWeight: 'bold'}}> Contacts List ... </Text> 
    
    <FlatList 
      data = {contactList}
      renderItem ={({item, index}) =>{
       return(
          <View
          style ={{
            width: '90%',
            height: 50,
            alignSelf:'center',
            borderRadius: 10,
            marginTop: 10,
            borderWidth: 1,
            flexDirection:'row',
            alignItem: 'center',
            justifyContent: 'space-between',
            paddingLeft: 20,
          }}>
        <View>
          <Text>{item.name.toUpperCase()}</Text>
          <Text style = {{ marginLeft: 20 }}>{item.mobile}</Text>
        </View>

          <TouchableOpacity
          style ={{
            backgroundColor: 'red',
            justifyContent:'center',
            alignItems: 'center',
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10,

          }}
          onPress ={() => deleteContact(index)}>
          <Text style ={{color: 'white'}}> Delete </Text>

          </TouchableOpacity>
          </View>
       );
      }}
    />

      <TouchableOpacity
      style ={{
        height: 40,
        borderRadius: 30,
        alignSelf: 'center',
        padding: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}
      onPress = {() =>{
      logout()
      }}>

      <Text style={{color: 'white',color: 'white',fontSize: 15, fontWeight: 'bold'}}>
            Logout
      </Text>
      </TouchableOpacity>

      <TouchableOpacity
      style ={{
        height: 40,
        borderRadius: 30,
        alignSelf: 'center',
        padding: 20,
        backgroundColor: 'blue',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}
      onPress ={() =>{
      navigation.navigate('AddContact');
      }}>
      <Text style={{color: 'white',color: 'white',
        fontSize: 15,
        fontWeight: 'bold'}}>
      Add New Contact
      </Text>
      </TouchableOpacity>

    </View>
  );
}

export default Contact;
