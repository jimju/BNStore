'use strict'
import React, {Component} from "react";
import {Text, StyleSheet, View,Image, Modal,Button, TouchableHighlight, Dimensions,Picker} from "react-native";
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;
import {fetchShop} from '../actions/ChannelAction';

class ProductDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modalVisible: false,
        shop:{},distribute:''};
    }

    //显示弹窗
    showModal() {
        this.setState({modalVisible: true});
    }

    //隐藏弹窗
    hideModal() {
        this.setState({modalVisible: false});
    }

    _commit(){
        this.setState({modalVisible:false});
    }

    //获取经销商列表
    _renderDistribute(distribute){
        let distributes = [];
        let diss = distribute?distribute.data:[];
        for (let i = 0; i<diss.length;i++){
            distributes.push(<Picker.Item label={diss[i].distributorName} value={diss[i]} />);
        }
        return distributes;
    }

    //获取门店列表
    _renderShop(shop){
        let shops = [];
        let ss = shop?shop.data:[];
        for (let i = 0; i<ss.length;i++){
            shops.push(<Picker.Item key={i} label={ss[i].bspShopName} value={ss[i]} />);
        }
        return shops;
    }

    //初始化经销商和门店
    componentDidMount() {
        const {dispatch} = this.props;
    }

    //初始化经销商和门店
    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;
        if (this.state.distribute==''&&nextProps.distribute){
            this.setState({distribute:nextProps.distribute.data[0]});
            dispatch(fetchShop(nextProps.distribute.data[0].distributorId));
        }
    }

    render() {
        const {productDetail,shop,distribute,dispatch} = this.props;
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
                                    <View style={{width: ScreenWidth/2,flexDirection:'row'}}>
                                    <Text Style={{textAlign:'center',marginRight:ScreenWidth/2}}>渠道:</Text>
                                    </View>
                                    <View style={{width: ScreenWidth/2,flexDirection:'row'}}>
                                    <Text Style={{width: ScreenWidth/2,textAlign:'center'}}>经销商:</Text>
                                    </View>
                                </View>

                                <View style={{width: ScreenWidth,borderBottomColor:'#ddd',borderBottomWidth:1,flexDirection:'row',padding:10}} >
                                    <Picker
                                        style={{width: ScreenWidth/2}}
                                        selectedValue={this.state.distribute}
                                        onValueChange={(distribute) => {this.setState({distribute: distribute});
                                        dispatch(fetchShop(distribute.distributorId))}}>
                                        {this._renderDistribute(distribute)}
                                    </Picker>
                                    <Picker
                                        style={{width: ScreenWidth/2}}
                                        selectedValue={this.state.shop}
                                        onValueChange={(shop) => this.setState({shop: shop})}>
                                        {this._renderShop(shop)}
                                    </Picker>
                                </View>
                                <Text style={{position:'absolute',width:ScreenWidth,bottom:20,height:45,backgroundColor:'#015ba6',color:'white',textAlign:'center',padding:10}} onPress={() => this._commit()}> 立即购买</Text>
                            </View>
                            </TouchableHighlight>
                            <Image source={this.props.icon} style={{position:'absolute',height:90,width:90,left:10,bottom:210}}/>
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
