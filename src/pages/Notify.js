'use strict'
import React, { Component } from 'react';
import {
  Text,StyleSheet,View,ListView,Image
} from 'react-native';

import TitleProductDetail from '../component/TitleProductDetail';
class Notify extends React.Component {
  constructor(props){
    super(props);
    const notifies = [{title:'通知1',content:'Reactive-Native 0.41 上线了',date:'2017-02-02',state:'未读'},
  {title:'上线通知',content:'Reactive-Native 0.40 上线了',date:'2017-01-02',state:'未读'},
  {title:'通知2',content:'Reactive-Native 0.39 上线了',date:'2016-12-02',state:'已读'},
  {title:'通知3',content:'Reactive-Native 0.38 上线了',date:'2016-11-02',state:'已读'},
  {title:'通知',content:'Reactive-Native 0.37 上线了',date:'2016-10-02',state:'已读'}];
  let dataSource = new ListView.DataSource(
    {rowHasChanged:(row1,row2) => row1 !== row2}
  );
  this.state = {
    notify:dataSource.cloneWithRows(notifies)
  };
  }

  _renderList(rowData, sectionID, rowID){
    return(
      <View style={styles.itemcontent}>
        <Image style={styles.itemimage} source={require('../res/images/about_us.png')}/>
        <View style={{flexDirection:'column',flex:1,justifyContent:'center'}}>
          <Text>{rowData.title}</Text>
          <Text style={{marginTop:15}}>{rowData.content}</Text>
        </View>
        <View style={{flexDirection:'column',justifyContent:'center'}}>
          <Text>{rowData.date}</Text>
          <Text style={{textAlign:'right',marginTop:15}}>{rowData.state}</Text>
        </View>
      </View>
    );
  }
  render(){
    return(
      <View style={styles.content}>
        <TitleProductDetail {...this.props}/>
        <ListView contentContainerStyle={styles.list} dataSource={this.state.notify}
        renderRow={this._renderList.bind(this)}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content:{
    flex:1,
    backgroundColor:'#fff',
    flexDirection:'column',
  },
  itemcontent:{
    flexDirection:'row',
    height:100,
    padding:10,
    borderBottomWidth:0.5,
    borderColor:'#d7d7db'
  },
  list: {
       flexDirection: 'column',
       justifyContent:'center',
   },
   itemimage:{
     height:50,
     width:50,
     margin:10
   }
});
export {Notify as default};
