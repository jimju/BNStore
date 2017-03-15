'use strict'
import React, { Component } from 'react';
import {
  Text,StyleSheet,View
} from 'react-native';

class Test extends React.Component {
  render(){
    return(
      <View style={styles.content}>
        <Text> Hello Test !</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content:{
    flex:1,
    flexDirection:'column',
  }
});
export {Test as default};
