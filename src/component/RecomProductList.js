import React, {Component} from 'react';
import {
    AppRegistry, StyleSheet, TouchableHighlight, Text, View, ListView, Image, ToastAndroid, InteractionManager
} from 'react-native';
import {HOST} from '../common/utils';
import ProductDetail from '../pages/ProductDetail';
import {connect} from 'react-redux';

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
import {fetchProduct, fetchProductM} from '../actions/ProdcutActions';

class RecomProductList extends React.Component {
    constructor(props) {
        super(props);
        this.currentPage = 1;
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {foottext: '正在为您加载更多...'};
    }

    showtoast(text) {
        ToastAndroid.show(text, ToastAndroid.LONG);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchProduct(1, 10));
    }


    _renderList(prod) {
        return (

            <TouchableHighlight underlayColor={'#fff'} onPress={() => this._startDetail(prod.productHeaderId)}>
                <View style={styles.listitem}>
                    <View>
                        <Image source={{
                            uri: prod.fileProperties[0] ? prod.fileProperties[0].url + "/" + prod.fileProperties[0].fileName
                                : HOST + "/eihView/images/img_default.png"
                        }}
                               style={[{width: 80, height: 80, justifyContent: 'center'}, {resizeMode: 'stretch'}]}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, justifyContent: 'center'}}>
                        <Text numberOfLines={2} style={{fontSize: 15, marginBottom: 3}}>{prod.productName}</Text>
                        <Text>{prod.productNumber}</Text>
                        <Text style={{fontSize: 15, color: 'red'}}>{prod.brandPrice}</Text>
                    </View>
                </View>
            </TouchableHighlight>);

    }

    footer() {
        return (
            <TouchableHighlight underlayColor={'#fff'} onPress={() => {
                this._loadMore()
            }}>
                <Text style={styles.footertext}>{this.state.foottext}</Text>
            </TouchableHighlight>
        );
    }

    _loadMore() {
        const {dispatch, product} = this.props;
        if (product && product.data.length < product.totalCount) {
            ++this.currentPage;
            dispatch(fetchProductM(this.currentPage, 10));
        } else {
            this.setState({foottext: '没有更多数据了'});
        }
    }

    //跳转产品搜索
    _startDetail(text) {
        const {navigator} = this.props;

        navigator.push({
            component: ProductDetail,
            name: 'ProductDetail',
            value: text

        });
    }


    render() {
        const {product} = this.props;
        return (
            <View>
                <ListView contentContainerStyle={styles.list}
                          dataSource={this.ds.cloneWithRows(product ? product.data : [])}
                          onEndReached={this._loadMore.bind(this)}
                          onEndReachedThreshold={30}
                          renderFooter={this.footer.bind(this)}
                          renderRow={prod => this._renderList(prod)}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: ScreenWidth,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
        marginLeft: 10
    },
    listitem: {
        width: ScreenWidth - 110,
        flexDirection: 'row',
        height: 100,
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d7d7db',
        margin: 2,
    },
    stylecenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footertext: {
        alignItems: 'center', fontSize: 16, justifyContent: 'center',
        flexDirection: 'row', padding: 5, marginLeft: ScreenWidth / 2 - 150, marginTop: 5, marginBottom: 10
    }
});
function select(state) {
    //console.log("state");
    //console.log(state);
    return {
        isFetching: state.productReducer.isFetching,
        product: state.productReducer.product
    }
}

export default connect(select)(RecomProductList);
