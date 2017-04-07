'use strict'
import React, {Component} from 'react';
import {
    Text, View, StyleSheet, Image, Dimensions, ScrollView, Button
} from 'react-native';

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import TitleProductDetail from '../component/TitleProductDetail';
import ProductDetailModal from '../component/ProductDetailModal';
import {connect} from 'react-redux';
import {fetchDetail} from '../actions/ProdcutActions';
import {fetchDistribute} from '../actions/ChannelAction';
var ScreenWidth = Dimensions.get('window').width;
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            dealerData:{},
            shopData:{}
        };
    }


    _renderDotIndicator() {
        const {productDetail} = this.props;
        return <PagerDotIndicator pageCount={this._renderPager(productDetail).bancou}/>;
    }

    _countplus() {
        this.setState({
            count: this.state.count + 1
        });
    }

    _countsub() {
        if (this.state.count > 1) {
            this.setState({
                count: this.state.count - 1
            });
        }

    }

    _commit() {

    }

    //视图绘制完成后加载数据
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchDetail(this.props.route.value));
        dispatch(fetchDistribute(1003));
    }

    _renderPager(productDetail) {
        var allChild = [];
        var alldes = [];
        let fps = productDetail ? productDetail.data.fileProperties : undefined;
        if (fps) {
            for (let i = 0; i < fps.length; i++) {
                if (fps[i].lookupCode == '1') {
                    allChild.push(<View key={i} style={styles.bannercontain}>
                        <Image style={styles.banner} source={{uri: fps[i].url + '/' + fps[i].fileName}}/>
                    </View>);
                }else {
                    alldes.push(<View key={i} style={styles.bannercontain}>
                        <Image style={styles.banner} source={{uri: fps[i].url + '/' + fps[i].fileName}}/>
                    </View>);
                }
            }
        } else {
            allChild.push(<View style={styles.bannercontain}>
                <Image style={styles.banner} source={require('../res/images/img_default.png')}/>
            </View>);
        }
        return {banners:allChild,dess:alldes,bancou:allChild.length};

    }

    /*
     * componentWillReceiveProps(nextProps)：props改变（父容器来更改或是redux），
     * 将会调用该函数。新的props将会作为参数传递进来，
     * 老的props可以根据this.props来获取。
     * 我们可以在该函数中对state作一些处理。
     * 注意：在该函数中更新state不会引起二次渲染。
     * */
    // componentWillReceiveProps(nextProps){
    //     if(this.state.dealerName === '' && nextProps.dealerArr.length){
    //         var dealerData = nextProps.dealerArr[0];
    //         this.setState({
    //             dealerName:dealerData.distributorName
    //         });
    //         this.props.dealerDidSelectBlock(dealerData);
    //     }
    //
    //     if((this.state.shopName === '' && nextProps.shopArr.length) || this.state.isRefreshShopData){
    //         var shopData = nextProps.shopArr[0];
    //         this.setState({
    //             shopName:shopData.bspShopName
    //         });
    //         this.props.shopDidSelectBlock(shopData);
    //     }
    //
    // }



    render() {
        const {productDetail} = this.props;
        return (
            <View style={styles.content}>
                <TitleProductDetail {...this.props} title={'详情'}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flex: 1, flexDirection: 'column', marginBottom: 50}}>
                        <IndicatorViewPager style={{height: ScreenWidth}} indicator={this._renderDotIndicator()}>
                            {this._renderPager(productDetail).banners}
                        </IndicatorViewPager>
                        <View style={styles.productinfo}>
                            <Text style={{fontSize: 14}}>{productDetail?productDetail.data.productName:''}</Text>
                            <View style={{flexDirection: 'column', marginTop: 5}}>
                                <Text style={{fontSize: 13}}>{productDetail?productDetail.data.productNumber:''}</Text>
                                <View style={{flex: 1}}/>
                                <Text style={{color: '#f00'}}>{productDetail?'￥'+productDetail.data.brandPrice:''}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', margin: 10, backgroundColor: '#fff'}}>
                            <Text style={{marginRight: 15}}>购买数量:</Text>
                            <Text style={styles.addbutton} onPress={() => this._countsub()}>-</Text>
                            <Text style={[styles.addbutton, {width: 39}]}>{this.state.count}</Text>
                            <Text style={styles.addbutton} onPress={() => this._countplus()}>+</Text>
                        </View>
                        <View style={{width:ScreenWidth,height:50,padding:10,marginTop:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                            backgroundColor:'#d3d3d388'}}>
                            <Text>详情</Text>
                        </View>

                        {this._renderPager(productDetail).dess}
                    </View>
                </ScrollView>
                <Text  style={{width:ScreenWidth,height: 45,padding:10,backgroundColor:'#015ba6',color:'white',textAlign:'center',fontSize:20,
                    position:'absolute',bottom:1}}
                        onPress={() => {
                            let ProductDetailModal = this.refs.pdm;
                            ProductDetailModal.showModal();}}>立即购买</Text>
                <ProductDetailModal ref="pdm" {...this.props} icon={productDetail&&productDetail.data.fileProperties?{uri:productDetail.data.fileProperties[0].url
                    + '/' + productDetail.data.fileProperties[0].fileName}:require('../res/images/img_default.png')}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#f3f7fb',
    },
    banner: {
        width: ScreenWidth,
        height: ScreenWidth,
    },
    bannercontain: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    productinfo: {
        flexDirection: 'column',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: '#d7d7db',
        borderWidth: 0.5,
        borderTopColor: '#d7d7db',
        backgroundColor: '#fff'
    },
    addbutton: {
        width: 30,
        height: 30,
        borderColor: '#d7d7db',
        borderWidth: 0.5,
        padding: 3,
        fontSize: 18,
        textAlign: 'center',
    }
});
function select(state) {
    // console.log(state);
    return {
        productDetail: state.productReducer.productDetail,
        distribute: state.channelReducer.distribute,
        shop: state.channelReducer.shop
    }
}

export default connect(select)(ProductDetail);
