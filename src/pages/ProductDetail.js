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
var ScreenWidth = Dimensions.get('window').width;
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
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
                <Button title='立即购买' style={{height: 50, marginRight: 10, marginLeft: 10}}
                        onPress={() => {
                            let ProductDetailModal = this.refs.pdm;
                            ProductDetailModal.showModal();}}/>
                <ProductDetailModal ref="pdm" {...this.props}/>
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
    console.log(state);
    return {
        productDetail: state.productReducer.productDetail
    }
}

export default connect(select)(ProductDetail);
