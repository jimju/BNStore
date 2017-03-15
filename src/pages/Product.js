'use strict'
import React, { Component } from 'react';
import {
  Text,StyleSheet,View
} from 'react-native';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
class Product extends React.Component {
  render(){
    return(
        <PullRefreshScrollView ref="PullRefresh" onRefresh={()=>this.onRefresh()}>
          <View><Text>Scroll1</Text></View>
        </PullRefreshScrollView>
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
