'use strict'
import React, {Component} from 'react';
import {
    Text, StyleSheet, View, Modal, TouchableHighlight, Dimensions, TextInput, Image
} from 'react-native';
let ScreenWidth = Dimensions.get('window').width;

import TitleProductDetail from '../component/TitleProductDetail';
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            addressData: {}
        };
    }

    componentDidMount() {
        this.setState({addressData: this.props.route.value});
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        //是否是默认地址
        let defalut = this.state.addressData.defaultFlag == 'Y' ? require('../res/images/select@2x.png') : require('../res/images/shippingAddress_normal@2x.png');
        return (
            <View style={styles.content}>
                <TitleProductDetail {...this.props} title="编辑收货地址"/>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => {
                        let newAddress = this.state.addressData;
                        newAddress.fullName = text;
                        this.setState({addressData: newAddress});
                    }}
                    value={this.state.addressData.fullName}/>

                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => {
                        let newAddress = this.state.addressData;
                        newAddress.telephone = text;
                        this.setState({addressData: newAddress});
                    }}
                    value={this.state.addressData.telephone}/>
                <Text style={styles.input}>
                    {this.state.addressData.province + '、' + this.state.addressData.city + '、' + this.state.addressData.county }</Text>

                <TextInput
                    style={styles.input}
                    multiline={true}
                    onChangeText={(text) => {
                        let newAddress = this.state.addressData;
                        newAddress.shipToAddr = text;
                        this.setState({addressData: newAddress});
                    }}
                    value={this.state.addressData.shipToAddr}/>

                <TouchableHighlight underlayColor={'#ffffff00'} onPress={() => {
                    let newAddress = this.state.addressData;
                    newAddress.defaultFlag = this.state.addressData.defaultFlag == 'Y' ? 'N' : 'Y';
                    this.setState({addressData: newAddress});
                }}>
                    <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center'}}>
                        <Text>设置为默认地址</Text>
                        <Text style={{flex: 1}}></Text>
                        <Image style={{width: 20, height: 20, marginRight: 10}} source={defalut}/>
                    </View>
                </TouchableHighlight>

                <View style={{marginTop: 10, padding: 10, backgroundColor: 'white'}}>
                    <Text style={{
                        width: ScreenWidth - 20,
                        height: 45,
                        padding: 10,
                        backgroundColor: '#015ba6',
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 20
                    }}>保存</Text>
                </View>
            </View>
        );
    }

    //初始化modal
    initModal() {
        return (<View style={{marginTop: 22}}>
            <Modal
                style={{
                    borderRadius: 5,
                    height: 100,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    backgroundColor: '#33333333',
                    flex: 1,
                    overflow: 'hidden'
                }}
                animationType={"slide"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setState({modalVisible: false});
                }}>
                <View style={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,.3)',
                    flex: 1,
                    justifyContent: 'flex-end'
                }}>
                    <View style={{width: ScreenWidth, height: 266, backgroundColor: 'white'}}>
                        <View>
                            <Text>Hello World!</Text>
                            <TouchableHighlight onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </View>
            </Modal>

            <TouchableHighlight onPress={() => {
                this.setModalVisible(true)
            }}>
                <Text>Show Modal</Text>
            </TouchableHighlight>

        </View>);
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    input: {height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        color:'black',
        padding: 10}
});
export {Test as default};
