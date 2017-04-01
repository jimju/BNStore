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
  Navigator,
  StatusBar,
  Platform,
} from 'react-native';

import Splash from './Splash';

export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 0)
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19
var _navigator;
export default class root extends React.Component {
  constructor(props) {
    super(props);
    BackAndroid.addEventListener('hardwareBackPress',() =>{
      if (_navigator && _navigator.getCurrentRoutes().length > 1) {
           _navigator.pop();
             return true;
           }
    });
  }

  renderStatusBar(){
    if (Platform.OS == 'ios') {
      return(  <StatusBar
             barStyle='light-content'
             backgroundColor='transparent'
             style={{height: STATUS_BAR_HEIGHT}}
        />);
    }else {
      return(<View></View>);
    }
  }

  render(){
    return(<View style={styles.container}>
        {this.renderStatusBar()}
        <Navigator
        style={{flex:1}}
        initialRoute={{
          component:Splash,
          name:'Splash',
        }}
        renderScene={(route, navigator) =>{
          let Component = route.component;
          _navigator = navigator;
          return(<Component navigator={navigator} route = {route}/>);
        }}
        configureScene={() => {
          return Navigator.SceneConfigs.PushFromRight;
        }}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column'
  }
});
