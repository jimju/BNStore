'use strict'
import React, {Component} from 'react';
import {
    Text, StyleSheet, View, Image, TouchableOpacity,Dimensions, InteractionManager
} from 'react-native';

import Address from './Address';
import TitleProductDetail from '../component/TitleProductDetail';
import Notify from './Notify';
import {connect} from 'react-redux';
import {fetchAddress} from '../actions/AddressAction';
//个人中心

var ScreenWidth = Dimensions.get('window').width;

class UserInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            syncMessage:''
        }
    }
    //跳转消息
    _onNotifyClick() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: Notify,
                name: 'Notify',
                data: '消息'
            });
        });
    }
    //跳转地址管理
    _onAddressClick() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: Address,
                name: 'Address',
            });
        });
    }

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(fetchAddress(71));
    }

    render() {
        const {address} = this.props;
        return (
            <View style={styles.content}>
                <TitleProductDetail {...this.props} title="个人信息"/>
                <View style={{backgroundColor:'#dedede',padding:10}}>
                <Text style={{fontSize:18}}>个人信息</Text>
                </View>
                <TouchableOpacity >
                <View style={styles.item}>
                    <Text style={styles.itemtext}>头像</Text>
                    <View style={{flex: 1}}>
                    </View>
                    <Image style={styles.itemimg} source={require('../res/images/img_default.png')}/>
                    <Image style={[styles.itemimg]} source={require('../res/images/jiantou.png')}/>
                </View>
                </TouchableOpacity>

                <TouchableOpacity ><MineItem name="昵称" info="测试账号"/></TouchableOpacity>
                <TouchableOpacity ><MineItem name="修改密码" info=""/></TouchableOpacity>
                <TouchableOpacity ><MineItem name="手机号码" info="13660880888" /></TouchableOpacity>
                <TouchableOpacity onPress={() => this._onAddressClick()}><MineItem name="收货地址" info={address?address.data[0].shipToAddr:''}/></TouchableOpacity>
                <View style={{backgroundColor:'#dedede',padding:10}}>
                    <Text style={{fontSize:18}}>其他</Text>
                </View>
                <TouchableOpacity ><MineItem name="关于我们" info=""/></TouchableOpacity>
                <TouchableOpacity ><MineItem name="意见反馈" info=""/></TouchableOpacity>
                <TouchableOpacity onPress={() => this._onNotifyClick()}><MineItem name="版本更新" info="1.0.0"/></TouchableOpacity>

                <View style={{padding:10,backgroundColor:'#dedede', position:'absolute',bottom:1}}>
                    <Text  style={{width:ScreenWidth - 20,height: 45,padding:10,backgroundColor:'#015ba6',color:'white',textAlign:'center',fontSize:20}}>退出登录</Text>
                </View>
            </View>
        );
    }
}
//个人中心的item
class MineItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View style={styles.item}>
                <Text style={styles.itemtext}>{this.props.name}</Text>
                <View style={{flex: 1}}>
                </View>
                <Text style={styles.itemtext}>{this.props.info}</Text>
                <Image style={[styles.itemimg]} source={require('../res/images/jiantou.png')}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderBottomColor: '#d7d7db',
        borderBottomWidth: 0.5,
    },
    itemimg: {
        height: 20,
        width: 20,
    },
    itemtext: {
        fontSize: 14,
        marginLeft: 10,
    },
    header: {
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#015ba7',
    },
    content: {
        flex: 1,
        backgroundColor:'white',
        flexDirection: 'column',
    }
});

function select(state) {

    return {
        address:state.addressReducer.address
    }
}

export default connect(select)(UserInfo);
