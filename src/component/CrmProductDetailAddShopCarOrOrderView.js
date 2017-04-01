/**
 * Created by liaoqijin on 17/3/27.
 */
'use strict';

import React from 'react';
import {
Image,
View,
Text,
StyleSheet,
Platform,
TouchableOpacity,
NativeAppEventEmitter,
InteractionManager,
Modal,
Picker
} from 'react-native';


//let channelArr = [{name:'德国贝朗'},{name:'家装(1)'},{name:'海鸥'},{name:'犇牛'},{name:'好家伙'}];
//let dealerArr = [{name:'德国贝朗门店'},{name:'家装(1)门店'},{name:'海鸥门店'},{name:'犇牛门店'},{name:'好家伙门店'}];


export class CrmProductDetailAddShopCarOrOrderView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      productSum:1,
      isFinishEdit:false,
      dealerName:'',
      shopName:'',
      isRefreshShopData:false
    }
  }

  /*
  * componentWillReceiveProps(nextProps)：props改变（父容器来更改或是redux），
  * 将会调用该函数。新的props将会作为参数传递进来，
  * 老的props可以根据this.props来获取。
  * 我们可以在该函数中对state作一些处理。
  * 注意：在该函数中更新state不会引起二次渲染。
  * */
  componentWillReceiveProps(nextProps){
   /* if(this.state.dealerName === '' && nextProps.dealerArr.length){
      var dealerData = nextProps.dealerArr[0];
      this.setState({
        dealerName:dealerData.distributorName
      });
      this.props.dealerDidSelectBlock(dealerData);
    }

    if((this.state.shopName === '' && nextProps.shopArr.length) || this.state.isRefreshShopData){
      var shopData = nextProps.shopArr[0];
      this.setState({
        shopName:shopData.bspShopName
      });
      this.props.shopDidSelectBlock(shopData);
    }*/

  }



  render(){
    return(
    <Modal
    visible={this.state.modalVisible}
    //显示是的动画默认none
    //从下面向上滑动slide
    //慢慢显示fade
    animationType = {'slide'}
    //是否透明 默认是不透明 false
    transparent = {true}
    //关闭时调用
    onRequestClose={()=> this.onRequestClose()}
    >
    <TouchableOpacity activeOpacity={1} onPress={() => this.hideModal()}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.bottomViewBgStyle} ref="bottomBgView">

            <View style={styles.bottomViewStyle} ref="bottomView">

              {/*产品信息*/}
              <View style={styles.productInfoViewStyle}>
                <View style={styles.productInfoUpViewStyle}>
                  <Text style={styles.productNameTextStyle}>飞利浦</Text>
                </View>
                <View style={styles.productInfoBottomViewStyle}>
                  <Text style={styles.productPriceTextStyle}>¥888.88</Text>
                  <Text style={styles.productSumTextStyle}>已选:1件</Text>
                </View>
              </View>

              {/*产品数量*/}
              <View style={styles.productSumBgViewStyle}>
                <Text style={{color:'black',fontSize:14}}>    购买数量</Text>
                <View style={styles.productSumRightViewStyle}>
                  <Text style={{fontSize:18,width:40,height:25,textAlign:'center',marginRight:2}}>-</Text>
                  <Text style={{fontSize:16,color:'black',width:40,height:25,textAlign:'center',marginRight:2}}>{this.state.productSum}</Text>
                  <Text style={{fontSize:18,width:40,height:25,textAlign:'center'}}>+</Text>
                </View>
              </View>

              {/*渠道信息*/}
              <View style={styles.channelInfoBgViewStyle}>
                <Text style={{fontSize:13,textAlign:'center',marginLeft:10}}>经销商:{this.state.dealerName}</Text>
                <Text style={{fontSize:13,textAlign:'center'}}>门店:{this.state.shopName}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{

                //通过ref动态获取view,并改变其高度
                  var bottomBgView = this.refs.bottomBgView;
                  var bottomView = this.refs.bottomView;
                  if(!this.state.isFinishEdit){
                    bottomBgView.setNativeProps({
                    style:{
                          height:400,
                          }
                    });

                    bottomView.setNativeProps({
                    style:{
                          height:380,
                          }
                    });

                  }else{
                    bottomBgView.setNativeProps({
                    style:{
                          height:240,
                          }
                    });

                    bottomView.setNativeProps({
                     style:{
                          height:220,
                          }
                    });


                  }

                  this.setState({
                  isFinishEdit:!this.state.isFinishEdit
                });

                }}>
                  <View style={{flexDirection:'row',alignItems:'center',width:40}}>
                    <Text style={{fontSize:12,paddingRight:10}}>编辑</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.pickerBgViewStyle}>
                {this.pickerRender(this.props.dealerArr,true)}
                {this.pickerRender(this.props.shopArr, false)}
              </View>

              {/*立即购买/加入购物车*/}
              <View style={{height:40,position:'absolute',bottom:0,justifyContent:'center'}}>
                <Text style={{color:'white',fontSize:16,textAlign:'center'}}>立即购买</Text>
              </View>

            </View>

          </View>
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
      </Modal>
    );
  }

  //创建picker选择器
  pickerRender(dataArr, isDealer){
 /*   if(isDealer){
      if(this.state.dealerName === '' && dataArr.length){
        var dealerData = dataArr[0];
        this.setState({
          dealerName:dealerData.distributorName
        });
        this.props.dealerDidSelectBlock(dealerData);
      }
      return(
      <Picker
      prompt="请选择经销商"
      style={{height:160,marginTop:0,backgroundColor:'white'}}
      selectedValue={this.state.dealerName}
      onValueChange={(itemValue, itemPosition) => {
      var dealerData = dataArr[itemPosition];
      this.setState({dealerName: itemValue, isRefreshShopData:true});
      //回调回去告诉其选中的选项
      this.props.dealerDidSelectBlock(dealerData);
      }}
      >
        {this.pickerItemRender(dataArr, true)}
      </Picker>
      );
    }else{
      return(
      <Picker
      prompt="请选择门店"
      style={{height:160,marginTop:0,backgroundColor:'white'}}
      selectedValue={this.state.shopName}
      onValueChange={(itemValue, itemPosition) => {
       var shopName = dataArr.bspShopName;
       this.setState({shopName: itemValue});
       var shopData = dataArr[itemPosition];
       //回调回去告诉其选中的选项
       this.props.shopDidSelectBlock(shopData);
      }}
      >
        {this.pickerItemRender(dataArr, false)}
      </Picker>);
    }*/
  }

  test(dealerData){
  }

  pickerItemRender(dataArr, isDealer){

    // var pickerItemArr = [];
    // if(isDealer){
    //   for(var i = 0;i < dataArr.length;i ++){
    //     pickerItemArr.push(
    //     <Picker.Item key={i} label={dataArr[i].distributorName} value={dataArr[i].distributorName} />
    //     );
    //   }
    // }else{
    //   for(var i = 0;i < dataArr.length;i ++){
    //     pickerItemArr.push(
    //     <Picker.Item key={i} label={dataArr[i].bspShopName} value={dataArr[i].bspShopName} />
    //     );
    //   }
    // }
    // return pickerItemArr;
  }

  //显示
  showModal() {
    this.setState({
      modalVisible: true
    })
  }

  //隐藏
  hideModal() {
    this.setState({
      modalVisible: false
    })
  }

}

var styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.3)',

    //backgroundColor:'red',
    justifyContent:'flex-end',
  },
  bottomViewBgStyle:{

    height:340,
    backgroundColor:'rgba(0,0,0,0)',
  },
  bottomViewStyle:{
    height:220,
    backgroundColor:'white',
    position:'absolute',
    top:20
  },
  imageBgStyle:{
    width:90,
    height:90,
    position:'absolute',
    top:0,
    left:10
  },
  imageStyle:{
    width:100,
    height:100,
    borderRadius:5,
    backgroundColor:'white',
  },
  productInfoViewStyle:{
    justifyContent:'space-between',
    height:70,
    //backgroundColor:'red',
    position:'absolute',
    right:0
  },
  productNameTextStyle:{
    fontSize:14,

    marginLeft:10,
    marginTop:10
  },
  productPriceTextStyle:{
    fontSize:14,
    marginLeft:10,
  },
  productSCrmProductDetailAddShopCarOrOrderViewumTextStyle:{
    fontSize:14,
    marginLeft:10,
    marginTop:5
  },
  closeImageStyle:{
    position:'absolute',
    right:8,
    width:30,
    height:30,
    top:0
  },
  productInfoUpViewStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  productInfoBottomViewStyle:{
    justifyContent:'space-between',
  },
  productSumBgViewStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    position:'absolute',
    top:90,

    height:40,
    borderTopWidth:.5,

    borderBottomWidth:.5
  },
  productSumRightViewStyle:{
    position:'absolute',
    right:10,
    flexDirection:'row',
    alignItems:'center'
  },
  channelInfoBgViewStyle:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    position:'absolute',
    top:130,

    height:40,

    borderBottomWidth:.5
  },
  pickerBgViewStyle:{
    position:'absolute',
    top:170,
    height:160,
    backgroundColor:'red',
    flexDirection:'row'
  }

});

//导出
module.exports = CrmProductDetailAddShopCarOrOrderView;
























