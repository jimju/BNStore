'use strict'
import React, { Component
 } from 'react';
import {
  Text,
  StyleSheet,
  View,TouchableOpacity,InteractionManager,
  Image,Platform
} from 'react-native';

import Notify from '../pages/Notify';
const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 0)
class TitleProduct extends React.Component {

    //跳转消息
    _onNotifyClick(){
      const {navigator} = this.props;
      InteractionManager.runAfterInteractions(() => {
              navigator.push({
                component: Notify,
                name: 'Notify',
                data:'消息',
              });
            });
    }
  render(){
    return(
        <View style={styles.view}>
        <TouchableOpacity onPress={() => this._onNotifyClick()}>
          <Image  style={[styles.image,{resizeMode:'stretch'}]} source={require('../res/images/information.png')}/>
        </TouchableOpacity>
        <Text style={styles.titlttext}>SEAGULL</Text>
        <Image style={styles.image} source={require('../res/images/scan.png')}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  titlttext:{
      flex:1,
      fontSize:20,
      color:'#ffffff',
      textAlign:'center'
  },
  view:{
    flexDirection:'row',
    backgroundColor:'#015ba7',
    height:40+STATUS_BAR_HEIGHT,
    paddingTop:STATUS_BAR_HEIGHT,
    alignItems:'center',
  },
  image:{
    width:30,
    height:30,
    margin:5,

  }
});

export {TitleProduct as default};
