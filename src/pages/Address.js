'use strict'
import React, {Component} from 'react';
import {
    Text, StyleSheet, View, ListView, Image, TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import EditAddress from './EditAddress';

import TitleProductDetail from '../component/TitleProductDetail';
class Address extends React.Component {
    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource(
            {rowHasChanged: (row1, row2) => row1 !== row2}
        );

        this.state={

        }

    }

    _renderList(rowData, sectionID, rowID) {
        let defalut = rowData.defaultFlag == 'Y' ? require('../res/images/select@2x.png') : require('../res/images/shippingAddress_normal@2x.png');
        return (
            <View style={styles.itemcontent}>
                <View style={{flexDirection: 'row', flex: 1, padding: 10}}>
                    <Text>{rowData.fullName}</Text>
                    <Text style={{flex: 1}}></Text>
                    <Text style={{textAlign: 'right'}}>{rowData.telephone}</Text>
                </View>
                <View style={{
                    flexDirection: 'column',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#d7d7db',
                    padding: 10
                }}>
                    <Text >{rowData.shipToAddr}</Text>
                </View>
                <TouchableHighlight>
                    <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center'}}>
                        <Image style={{width: 20, height: 20, marginRight: 10}} source={defalut}/>
                        <Text>设置为默认地址</Text>
                        <Text style={{flex: 1}}></Text>
                        <Text style={styles.edittext} onPress={() => this._onEditClick(rowData)}>编辑</Text>
                        <Text style={styles.edittext}>删除</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    //跳转编辑收货地址
    _onEditClick(rowdata) {
        const {navigator} = this.props;
        navigator.push({
            component: EditAddress,
            name: 'EditAddress',
            value:rowdata
        });

    }

    render() {
        const {address} = this.props;
        return (
            <View style={styles.content}>
                <TitleProductDetail {...this.props} title="地址管理"/>
                <ListView contentContainerStyle={styles.list}
                          dataSource={address ? this.dataSource.cloneWithRows(address.data) : []}
                          renderRow={this._renderList.bind(this)}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    itemcontent: {
        flexDirection: 'column',
        height: 128,
        borderBottomWidth: 5,
        borderColor: '#d7d7db'
    },
    list: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    itemimage: {
        height: 50,
        width: 50,
        margin: 10
    },
    edittext: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        marginLeft: 10,
        borderWidth: 0.8,
        fontSize: 12,
        borderColor: '#d7d7db'
    }
});
function select(state) {
    // console.log(state);
    return {
        address: state.addressReducer.address
    }
}

export default connect(select)(Address);
