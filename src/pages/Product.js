'use strict'
import React, { Component } from 'react';
import {
  Text,StyleSheet,View
} from 'react-native';
class Product extends React.Component {
  render(){
    return(
          <View><Text>Scroll1</Text></View>
    );
  }
}
const styles = StyleSheet.create({
  content:{
    flex:1,
    flexDirection:'column',
  }
});
export {Product as default};
