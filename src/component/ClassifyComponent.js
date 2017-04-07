import React, {Component} from 'react';
import {
    AppRegistry, StyleSheet, TouchableHighlight, Text, View, ListView, Image, ToastAndroid, InteractionManager
} from 'react-native';
import {HOST} from '../common/utils';
import {connect} from 'react-redux';
import ProductSearch from '../pages/ProductSearch';

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
// import {fetchingSearch} from '../actions/ProdcutActions';

class ClassifyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.currentPage = 1;

        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

    }


    componentDidMount() {
        // const {dispatch} = this.props;
        // dispatch(fetchClassifyChild(this.state.pid));
    }


    _renderList(cla) {
        // let imgsource = cla.fileProperties?({uri:cla.fileProperties[0].url + "/" + cla.fileProperties[0].fileName}):(require('../res/images/pro.png'));
        return (
            <TouchableHighlight underlayColor={'#fff'} onPress={this._onSearchClick.bind(this, cla.classifyId)}>
                <View style={styles.listgriditem}>
                    <View>
                        <Image source={require('../res/images/pro1.png')}
                               style={[{width: 80, height: 80, justifyContent: 'center'}, {resizeMode: 'stretch'}]}/>
                    </View>
                    <Text style={{fontSize: 12, marginTop: 5}}>{cla.classifyName}</Text>
                </View>
            </TouchableHighlight>);

    }


    //跳转产品搜索
    _onSearchClick(text) {
        const {navigator} = this.props;
        // //console.log('excutiongepgweqrtwqrtweqtrwqetgwqetewq0');

        navigator.push({
            component: ProductSearch,
            name: 'ProductSearch',
            focus: false,
            value: text
        });

    }

    render() {
        const {classifyChild} = this.props;
        return (
            <View>
                <ListView
                    contentContainerStyle={styles.list}
                    enableEmptySections={true}
                    showsVerticalScrollIndicator={false}
                    dataSource={this.ds.cloneWithRows(classifyChild ? classifyChild.data : [])}
                    renderRow={cla => this._renderList(cla)}
                />
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
    listgriditem: {
        width: (ScreenWidth - 130) / 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        padding: 2,
        borderWidth: 0.5,
        borderColor: '#d7d7db',
        margin: 2,
    },
    footertext: {
        alignItems: 'center', fontSize: 16, justifyContent: 'center',
        flexDirection: 'row', padding: 5, marginLeft: ScreenWidth / 2 - 150, marginTop: 5, marginBottom: 10
    }
});

export default ClassifyComponent;