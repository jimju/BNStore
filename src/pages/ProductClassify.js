'use strict'
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image, TouchableOpacity, InteractionManager,
    ListView
} from 'react-native';

import TitleProduct from '../component/TitleProduct';
import ProductSearch from './ProductSearch';
import {connect} from 'react-redux';
import ClassifyComponent from '../component/ClassifyComponent';
import RecomProductList from '../component/RecomProductList';
import {fetchClassify, fetchClassifyChild} from '../actions/ClassfiyAction';
class ProductClassify extends React.Component {
    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.state = {
            currentId: 0,
            dataSource: this.dataSource
        };
    }

//跳转产品详情
    _onSearchClick() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ProductSearch,
                name: 'ProductSearch',
                focus: true
            });
        });
    }


    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchClassify(1, null));
    }


    _pressRow(rowID) {

        // var dataSource2 = new ListView.DataSource({
        //     rowHasChanged: (row1, row2) => row1 !== row2
        // });
        // this.setState({currentId: rowID, classifies: dataSource2});
        this.setState({currentId: rowID});
        console.log(rowID);
        if (rowID > 0) {
            const {dispatch, classify} = this.props;
            dispatch(fetchClassifyChild(classify.data[rowID-1].classifyId));
        }
    }

    _renderRow(rowData, sectionID, rowID) {
        console.log(rowData);
        return (
            <View>
                <TouchableOpacity onPress={() => this._pressRow(rowID)}>
                    <Text>{rowData.classifyName}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _righComponent() {
        let clickId= this.state.currentId;
        if (clickId == 0) {
            return (<RecomProductList {...this.props}/>);
        } else {
            return (<ClassifyComponent {...this.props}/>);
        }
    }


    _renderList(rowData, sectionID, rowID) {
        if (rowID == this.state.currentId) {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    borderLeftWidth: 3,
                    borderLeftColor: '#015ba7',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#d7d7db'
                }}>
                    <Text style={{fontSize: 14, color: '#015ba7'}}>{rowData.classifyName}</Text>
                </View>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => this._pressRow(rowID)}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#d7d7db'
                    }}>
                        <Text style={{fontSize: 14}}>{rowData.classifyName}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchClassify(1, null));
    }

    render() {
        const {classify} = this.props;
        let data = [{classifyName: '推荐商品'}].concat(classify ? classify.data : {});
        return (
            <View style={{flex: 1, marginBottom: 15}}>
                <TitleProduct {...this.props}/>

                <TouchableOpacity onPress={() => this._onSearchClick()}>
                    <View style={styles.searchview}>
                        <Image style={{width: 15, height: 15}} source={require('../res/images/search.png')}/>
                        <Text style={styles.searchtext}>请输入要搜索的商品</Text>
                    </View>
                </TouchableOpacity>

                <View style={{height: 1, backgroundColor: '#d7d7db'}}>
                </View>

                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <View style={{width: 100}}>
                        <ListView contentContainerStyle={styles.list}
                                  enableEmptySections={true}
                                  showsVerticalScrollIndicator={false}
                                  dataSource={this.state.dataSource.cloneWithRows(data)}
                                  renderRow={this._renderList.bind(this)}/>
                    </View>
                    {this._righComponent()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
        width: 100,
        marginTop: 5,
        justifyContent: 'center',
    },
    searchview: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: '#d7d7db',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchtext: {
        fontSize: 13,
        color: '#c7c7cb',
        marginLeft: 5,
    },
    itemtext: {
        fontSize: 14,
    }
})
function classify(state) {
    console.log(state);
    return {
        classify: state.classifyReducer.classify,
        classifyChild: state.classifyReducer.classifyChild
    }
}
export default connect(classify)(ProductClassify);
