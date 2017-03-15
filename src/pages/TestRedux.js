'use strict'
import React, {Component} from 'react';
import {fetchToken} from '../actions/TokenActions';
import {fetchProduct} from '../actions/ProdcutActions';
import {
    Text, StyleSheet, View,TouchableOpacity,Alert
} from 'react-native';
import { connect } from 'react-redux';

class TestRedux extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
        const { dispatch,token,product} = this.props
        return (
            <View style={styles.content}>
                <TouchableOpacity onPress={()=>dispatch(fetchToken())}>
                <Text> 点击获取token</Text>
                </TouchableOpacity>
                <Text >token:{token?token.data.token:""}</Text>
                <TouchableOpacity onPress={()=>dispatch(fetchProduct())}>
                    <Text>获取产品</Text>
                </TouchableOpacity>
                <Text>product:{product?product.status:""}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    }
});
function select(state) {
    console.log(state);
    return{
        token:state.tokenReducer.token,
        product:state.productReducer.product
    }
}

export default connect(select)(TestRedux);
