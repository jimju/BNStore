'use strict'
import React, { Component
 } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,Platform
} from 'react-native';

const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 0)
class TitleProductDetail extends React.Component {
  constructor(props){
    super(props);

  }

  _back(){
    const {navigator} = this.props;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
  		navigator.pop();
    }
  }

  render(){

    return(
        <View style={styles.view}>
        <TouchableOpacity onPress={() => this._back()}>
        <Image  style={[styles.image,{resizeMode:'stretch'}]} source={require('../res/images/back.png')}/>
        </TouchableOpacity>
        <Text style={styles.titlttext}>{this.props.title}</Text>
        <Image style={styles.image} />
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
    width:20,
    height:30,
    margin:5,
    paddingRight:20,
  }
});

export {TitleProductDetail as default};
