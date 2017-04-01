'use strict'
import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    ScrollView,
    InteractionManager,
    RefreshControl,
    ToastAndroid,
    Dimensions,
    TouchableHighlight,
    ListView,
    onEndReachedThreshold,
    onEndReached
} from 'react-native';
import ViewUtils from '../common/ViewUtils';
import {connect} from 'react-redux';
import {HOST} from '../common/utils';
import CrmScrollImageView from '../component/CrmScrollImageView';
import ProductDetail from './ProductDetail';
import {fetchProduct, fetchProductM} from '../actions/ProdcutActions';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.currentPage = 1;
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.state = {
            debug: '',
            foottext: '正在为您加载更多...',
            products: []
        }
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3}/>;
    }

    //视图绘制完成后加载数据
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchProduct(1, 10));
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


    _onRefresh() {
        const {dispatch} = this.props;
        this.currentPage = 1;
        dispatch(fetchProduct(this.currentPage, 10));
    }

    _debug(info) {
        this.setState({debug: info});
    }

    _renderList(prod) {
        return (
            <TouchableHighlight
                underlayColor={'#fff'} onPress={() => this._startDetail(prod.productHeaderId)}>
                <View style={styles.listitem}>
                    <Image source={{
                        uri: prod.fileProperties[0] ? prod.fileProperties[0].url + "/" + prod.fileProperties[0].fileName
                            : HOST + "/eihView/images/img_default.png"
                    }}
                           style={[{
                               width: ScreenWidth / 2 - 20,
                               height: ScreenWidth / 2 - 20,
                               justifyContent: 'center',
                               flexDirection: 'row',
                               alignItems: 'center'
                           }, {resizeMode: 'contain'}]}/>
                    <View style={styles.stylecenter}>

                    </View>
                    <View>
                        <Text numberOfLines={1} style={{fontSize: 15, marginTop: 5}}>{prod.productName}</Text>
                        <Text style={{fontSize: 15, marginTop: 5}}>{prod.productNumber}</Text>
                        <Text style={{fontSize: 15, color: 'red'}}>{prod.brandPrice}</Text>
                    </View>
                </View>
            </TouchableHighlight>);
    }

    header() {
        return (<View>
                <CrmScrollImageView/>
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

                <View style={{
                    width: ViewUtils.ScreenWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5
                }}>
                    <Image style={styles.recomimage} source={require('../res/images/mainrecom.png')}/>
                </View>
            </View>
        );
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

    render() {
        const {isFetching, product} = this.props;
        return (
            <View style={styles.content}>

                <ListView
                    renderHeader={this.header.bind(this)}
                    dataSource={this.dataSource.cloneWithRows(product ? product.data : [])}
                    renderRow={prod => this._renderList(prod)}
                    onEndReached={this._loadMore.bind(this)}
                    onEndReachedThreshold={30}
                    renderFooter={this.footer.bind(this)}
                    contentContainerStyle={styles.list}
                    enableEmptySections={true}
                    refreshControl={ <RefreshControl
                        refreshing={ isFetching }
                        onRefresh={this._onRefresh.bind(this)}
                        progressBackgroundColor="#ffffff"
                        enabled={true}
                    />}
                />
            </View>

        )
    }
}
let ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    scrollview: {
        width: ScreenWidth,
        height: Dimensions.get('window').height
    },
    footertext: {
        alignItems: 'center', fontSize: 16, justifyContent: 'center',
        flexDirection: 'row', padding: 5, marginLeft: ScreenWidth / 2 - 50, marginTop: 5, marginBottom: 10
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
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: ScreenWidth,
        alignItems: 'center',
        justifyContent: 'flex-start'

    },
    listitem: {
        width: ScreenWidth / 2 - 5,
        height: ScreenWidth / 2 + 80,
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        alignItems: 'flex-start',
        borderColor: '#d7d7db',
        margin: 2,
    },
    stylecenter: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
function select(state) {
    console.log("state");
    console.log(state);
    return {
        isFetching: state.productReducer.isFetching,
        product: state.productReducer.product
    }
}
export default connect(select)(Index);
