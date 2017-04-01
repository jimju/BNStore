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

import {HOST} from '../common/utils';
import {connect} from 'react-redux';
import TitleProductSearch from '../component/TitleProductSearch';
import {fetchingSearch} from '../actions/ProdcutActions';


class ProductSearch extends React.Component {
    constructor(props) {
        super(props);
        this.currentPage = 1;
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        console.log(props);
        this.state = {
            key: '',
            foottext: '正在为您加载更多...'
        }
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3}/>;
    }

    //视图绘制完成后加载数据
    componentDidMount() {
        this._onRefresh();
    }


    _onRefresh() {
        const {dispatch} = this.props;
        this.currentPage = 1;
        dispatch(fetchingSearch(this.currentPage, 10, this.state.key, this.props.route.value));
    }

    _search() {
        const {dispatch} = this.props;
        this.currentPage = 1;
        dispatch(fetchingSearch(this.currentPage, 10, this.state.key, null));
    }

    _renderList(prod) {
        return (
            <TouchableHighlight
                underlayColor={'#fff'}>
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
        const {dispatch, productSearch} = this.props;
        console.log('加载更多。。。。。。');
        if (productSearch && productSearch.data.length < productSearch.totalCount) {
            ++this.currentPage;
            dispatch(fetchingSearch(this.currentPage, 10, this.state.key, this.props.route.value));
        } else {
            this.setState({foottext: '没有更多数据了'});
        }
    }

    _textchagne(text) {
        this.setState({key: text})
    }

    render() {
        const {isFetching, productSearch} = this.props;
        return (
            <View style={styles.content}>
                <TitleProductSearch {...this.props} search={this._search.bind(this)} tc={this._textchagne.bind(this)}/>
                <ListView
                    dataSource={this.dataSource.cloneWithRows(productSearch ? productSearch.data : [])}
                    renderRow={prod => this._renderList(prod)}
                    onEndReachedThreshold={30}
                    onEndReached={this._loadMore.bind(this)}
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
        justifyContent: 'center',
        backgroundColor:'white'
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
        width: ScreenWidth,
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
    console.log(state);
    return {
        isFetching: state.productReducer.isFetching,
        productSearch: state.productReducer.productSearch
    }
}

export default connect(select)(ProductSearch);