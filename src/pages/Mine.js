'use strict'
import React, {Component} from 'react';
import {
    Text, StyleSheet, View, Image, TouchableOpacity, InteractionManager
} from 'react-native';

import Notify from './Notify';
import Storage from '../common/Storage';
//个人中心


class Mine extends React.Component {
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

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.header}>
                    <Image style={{width: 80, height: 80}} source={require('../res/images/defalut_icon.png')}/>
                    <Text style={{fontSize: 17, color: '#fff', marginTop: 5}}>未登录</Text>
                </View>
                <MineItem name="全部订单" icon={require('../res/images/min_all_order.png')}/>
                <MineItem name="浏览记录" icon={require('../res/images/mine_record.png')}/>
                <TouchableOpacity ><MineItem name="我的收藏" icon={require('../res/images/mine_collection.png')}/></TouchableOpacity>
                <TouchableOpacity ><MineItem name="关于我们（点击更新）" icon={require('../res/images/about_us.png')}/></TouchableOpacity>
                <TouchableOpacity onPress={() => this._onNotifyClick()}><MineItem name="消息通知" icon={require('../res/images/mine_message.png')}/></TouchableOpacity>
                <MineItem name="设置" icon={require('../res/images/mine_setting.png')}/>
                <Text>{this.state.syncMessage}</Text>
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
                <Image style={styles.itemimg} source={this.props.icon}/>
                <Text style={styles.itemtext}>{this.props.name}</Text>
                <View style={{flex: 1}}>
                </View>
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
        marginLeft: 25,
    },
    header: {
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#015ba7',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
    }
});

export {Mine as default};
