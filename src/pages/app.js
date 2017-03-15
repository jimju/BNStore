'use strict'
import React, { Component } from 'react';
import {
  Text,StyleSheet,View
} from 'react-native';


import Root from './root';
// import MainPage  from './MainPage';
import store from '../store/store'
import {Provider} from 'react-redux';

class app extends React.Component {
  render(){
    return(
        <Provider store={store}>
          <Root />
        </Provider>
    );
  }
}

export {app as default};
