'use strict'
import React, {Component} from 'react';
import {
    Text, StyleSheet, View, Image, ScrollView, InteractionManager
} from 'react-native';
import ViewUtils from '../common/ViewUtils';
import {connect} from 'react-redux';
import {fetchProduct} from '../actions/ProdcutActions';
import ProductList from '../component/ProductList';
import {PagerDotIndicator, IndicatorViewPager} from 'rn-viewpager';
const Banners = ["http://192.168.30.76/think/images/banner/banner_one.jpg", "http://192.168.30.76/think/images/banner/banner_two.jpg"
    , "http://192.168.30.76/think/images/banner/banner_three.jpg"];
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.index = 0;
        this.state = {
            products: []
        }
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3}/>;
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchProduct());
        this.viewpagerTimer();
    }

    viewpagerTimer() {
        setInterval(() => {
            let viewpager = this.refs.viewpager;
            viewpager.setPage(this.index++ % 3);
        }, 3000);
    }

    showProducts(product){
        console.log("showProducts");
        console.log(product);
        if(product)
            return (<ProductList products={product.data} />)
        else
            return (<Text></Text>)
    }

    render() {
        const {product} = this.props;
        return (
            <ScrollView>
                <View style={styles.content}>
                    <IndicatorViewPager
                        ref='viewpager'
                        style={{height: 300}}
                        indicator={this._renderDotIndicator()}>
                        <View style={styles.banner}>
                            <Image style={styles.banner} source={{uri: Banners[0]}}/>
                        </View>
                        <View style={styles.banner}>
                            <Image style={styles.banner} source={{uri: Banners[1]}}/>
                        </View>
                        <View style={styles.banner}>
                            <Image style={styles.banner} source={{uri: Banners[2]}}/>
                        </View>
                    </IndicatorViewPager>

                    <View style={{margin: 5, flexDirection: 'row', alignItems: 'center', height: 65}}>
                        <Image style={styles.imagebg} source={require('../res/images/anli.jpg')}>
                            <Image style={styles.itemimage} source={require('../res/images/anli_icon.png')}/>
                            <Text style={styles.itemtext}>案例推荐</Text>
                        </Image>
                        <Image style={styles.imagebg} source={require('../res/images/youshi.jpg')}>
                            <Image style={styles.itemimage} source={require('../res/images/youshi_icon.png')}/>
                            <Text style={styles.itemtext}>海鸥优势</Text>
                        </Image>
                    </View>

                    <View style={{width:ViewUtils.ScreenWidth,justifyContent:'center',alignItems:'center',margin:5}}>
                        <Image style={styles.recomimage} source={require('../res/images/mainrecom.png')}/>
                    </View>

                    {this.showProducts(product)}

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    scrollview: {
        width: ViewUtils.ScreenWidth,
        height: ViewUtils.ScreenHeight
    },
    imagebg: {
        width: 235,
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemtext: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        backgroundColor: '#ffffff00',
    },
    itemimage: {
        width: 23,
        height: 23,
        margin: 5,
    },
    banner: {
        width: ViewUtils.ScreenWidth,
        height: 300,
    }
});
function select(state) {
    return {
        product: state.productReducer.product
    }
}
export default connect(select)(Index);
