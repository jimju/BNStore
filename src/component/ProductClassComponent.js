'use strict'
import React, { Component } from 'react';
import {
  Text,View,ListView,StyleSheet,Image,TouchableHighlight,InteractionManager
} from 'react-native';

import ProductDetail from '../pages/ProductDetail';
import ProductSearch from '../pages/ProductSearch';


var ScreenWidth = require('Dimensions').get('window').width;
class ProductClassComponent extends React.Component {
  constructor(props) {
    super(props);

     var prods = [{title:'陶瓷刀',img:require('../res/images/pro1.png')},{title:'单冷龙头',img:require('../res/images/pro1.png')}
    ,{title:'洗衣机龙头',img:require('../res/images/pro1.png')},{title:'立式单冷龙头',img:require('../res/images/pro1.png')}
    ,{title:'瓷芯拖把龙头',img:require('../res/images/pro1.png')}
    ,{title:'瓷芯十字拖把龙头',img:require('../res/images/pro1.png')}];

    var dataSource = new ListView.DataSource({
      rowHasChanged:(row1,row2) => row1 !== row2
    });

    this.state = {
      prods:dataSource.cloneWithRows(prods),
      clf:dataSource.cloneWithRows(prods)
    };
  }

  //跳转产品详情
  _onItemclick(text){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: ProductDetail,
              name: 'ProductDetail',
              data: '产品详情',
              info: text,
            });
          });
  }

  //跳转产品搜索
  _onSearchClick(text){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: ProductSearch,
              name: 'ProductSearch',
              value: text,
            });
          });
  }


  _renderHorList(rowData, sectionID, rowID){
    return(
    <TouchableHighlight underlayColor={'#fff'}  onPress={this._onItemclick.bind(this,rowData.title)}>
    <View style={styles.listitem}>
    <View>
      <Image source={rowData.img}
      style={[{width:80,height:80,justifyContent:'center'},{resizeMode:'stretch'}]}/>
    </View>
    <View style={{flex:1,flexDirection:'column',marginLeft:10}}>
      <Text style={{fontSize:15,marginTop:5,marginBottom:3}}>{rowData.title}</Text>
      <Text>c001-100</Text>
      <Text style={{fontSize:15,marginTop:3}} >￥99</Text>
          </View>
    </View>
    </TouchableHighlight>);
  }

  _renderGridList(rowData, sectionID, rowID){
    return(
    <TouchableHighlight underlayColor={'#fff'} onPress={this._onSearchClick.bind(this,rowData.title)}>
    <View style={styles.listgriditem}>
    <View>
      <Image source={rowData.img}
      style={[{width:80,height:80,justifyContent:'center'},{resizeMode:'stretch'}]}/>
    </View>
      <Text style={{fontSize:12,marginTop:5}}>{rowData.title}</Text>
    </View>
    </TouchableHighlight>);
  }


  render(){
    if (this.props.item == 0) {
      return(
        <View style={{flex:1,padding:5}}>
          <ListView contentContainerStyle={styles.listhor} dataSource={this.state.clf} renderRow={this._renderHorList.bind(this)}/>
        </View>
      );
    }else {
      return(
        <View style={{flex:1,padding:5}}>
            <ListView contentContainerStyle={styles.listgrid} dataSource={this.state.prods} renderRow={this._renderGridList.bind(this)}/>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  listhor: {
       width:ScreenWidth - 115,
       alignItems:'flex-start',
       justifyContent:'center',
       marginBottom:35,
   },

   listitem:{
     width:ScreenWidth - 120,
     flexDirection:'row',
     height:100,
     padding:10,
     borderWidth:0.5,
     borderColor:'#d7d7db',
     margin:2,
   },
   listgrid: {
        width:ScreenWidth - 115,
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'row',
        flexWrap:'wrap',
        marginBottom:35,
    },
   listgriditem:{
     width:(ScreenWidth - 130)/3,
     flexDirection:'column',
     alignItems:'center',
     justifyContent:'center',
     height:120,
     padding:2,
     borderWidth:0.5,
     borderColor:'#d7d7db',
     margin:2,
   }
});
export {ProductClassComponent as default};
