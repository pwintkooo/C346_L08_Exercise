import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
	textStyle: {
    	fontSize: 15,
    	margin: 10,
   		textAlign: 'left',
 	 },
   opacityStyle: {
      borderWidth: 1,
   },
   headerText: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    fontWeight:'bold',
    fontFamily:'impact'
  },
});

const Home = ({navigation}) => {
    const [myData, setMyData] = useState([]);

    const getData = async() => {
        let dataStr = await AsyncStorage.getItem('alphaData');
        if (dataStr!=null) {
            let jsondata = JSON.parse(dataStr);
            setMyData(jsondata);
        } else {
            setMyData(datasource);
        }
    };

    getData();

  const renderItem = ({item, index, section}) => {
    return (
    <TouchableOpacity style={styles.opacityStyle}
    onPress={()=>
      {
          let dataStr = JSON.stringify(myData);
        navigation.navigate("Edit",{dataString: dataStr,index:index, type:section.title, key:item.key})
      }
    }
    >
    <Text style={styles.textStyle}>{item.key}</Text>
    </TouchableOpacity>
    );
  };

   return (
    <View>
      <StatusBar/>
	  <Button
          title='Add Letter'
          onPress={()=>{
              let dataStr = JSON.stringify(myData);
              navigation.navigate("Add", {dataString: dataStr})}}
      />
      <SectionList sections={myData} renderItem={renderItem}
      renderSectionHeader={({section:{title,bgcolor}})=>(
      <Text style={[styles.headerText,{backgroundColor:bgcolor}]}>
        {title}
      </Text>
      )}/>
    </View>
  );
};

export default Home;
