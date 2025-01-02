import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Add = ({navigation, route}) => {
  const[letter,setLetter] = useState("");
  const[type,setType] = useState("Vowels");

  const setData = async(value) => {
      AsyncStorage.setItem('alphaData', value);
      navigation.navigate('Home');
  };

  return (
    <View>
      <StatusBar/>
      <Text>Letter:</Text>
      <TextInput maxLength={1} style={{borderWidth:1}} onChangeText={(text)=>setLetter(text)}/>
      <RNPickerSelect
        default={{label:"Vowels", value:"Vowels"}}
        onValueChange={(value)=>setType(value)}
        items={[
          {label:"Vowels", value:"Vowels"},
          {label:"Consonants", value:"Consonants"}
        ]}
      />
      <Button title='Submit'
      onPress={()=>{
          let myData = JSON.parse(route.params.dataString);
          let item = {key:letter};
          let indexnum = 1;
          if(type==="Vowels") {
            indexnum = 0;
          }
          myData[indexnum].data.push(item);
          let stringData = JSON.stringify(myData);
          setData(stringData);
        }
      }
      />
    </View>
  );
};

export default Add;
