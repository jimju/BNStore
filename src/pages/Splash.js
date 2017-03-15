'use strict';

import React from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  View,
  Text,
  BackAndroid,
  StyleSheet,
} from 'react-native';

import MainPage from './MainPage';
var Dimen = require('Dimensions');
var ScreenWidth = Dimen.get('window').getWidth;
var ScreenHeight = Dimen.get('window').getHeight;
export default class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {navigator} = this.props;
     this.timer=setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigator.resetTo({
          component: MainPage,
          name: 'MainPage'
        });
      });
    }, 2500);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }


  render(){
    return(<View style={styles.container}>
        <Image
        source={require('../res/images/welcome.png')}
         style={styles.image}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
},
  image:{
    flex:1,
    width:ScreenWidth,
    height:ScreenHeight,
  }
});
