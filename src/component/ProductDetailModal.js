'use strict'
import React, {Component} from "react";
import {Text, StyleSheet, View,Image, Modal, TouchableHighlight, Dimensions} from "react-native";
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

class ProductDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modalVisible: false,image: require('../res/images/img_default.png')};
    }

    showModal() {
        this.setState({modalVisible: true});
    }

    hideModal() {
        this.setState({modalVisible: false});
    }

    componentWillReceiveProps(nextProps){
        const {productDetail} = this.props;
    }

    render() {
        const {productDetail} = this.props;
        return (
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible:false});
                    }}>
                    <TouchableHighlight onPress={()=> this.hideModal()}>
                        <View style={{
                            backgroundColor: 'rgba(0,0,0,.3)',
                            justifyContent:'flex-end',
                            height:ScreenHeight
                        }}>
                            <TouchableHighlight>
                            <View style={{width: ScreenWidth, height: 266, backgroundColor: 'white'}}>
                                <View style={{marginLeft:98,padding:10,borderBottomColor:'#ddd',borderBottomWidth:1}}>
                                    <Text >{productDetail?productDetail.data.productName:''}</Text>
                                    <Text style={{color: '#f00'}}>{productDetail?'￥'+productDetail.data.brandPrice:''}</Text>
                                </View>
                                <View style={{width: ScreenWidth,borderBottomColor:'#ddd',borderBottomWidth:1,flexDirection:'row',padding:10}}>
                                    <Text Style={{flex:1,width: ScreenWidth/2,textAlign:'center'}}>渠道:</Text>
                                    <Text Style={{flex:1,width: ScreenWidth/2,textAlign:'center'}}>经销商:</Text>
                                </View>

                            </View>
                            </TouchableHighlight>
                            <Image source={this.state.image} style={{position:'absolute',height:90,width:90,left:10,bottom:210}}/>
                        </View>
                    </TouchableHighlight>

                </Modal>

        );
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        width:ScreenWidth,
        height:ScreenHeight,
    }
});
export {ProductDetailModal as default};
