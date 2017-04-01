import React, {Component} from 'react';
import {
    AppRegistry, StyleSheet,TouchableHighlight,  Text, View,ListView, Image,ToastAndroid
} from 'react-native';
import {HOST} from '../common/utils';

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        // this.prods = [{title:'陶瓷刀',img:require('../res/pro/pros1.jpg')},{title:'单冷龙头',img:require('../res/pro/pros2.jpg')}
        // ,{title:'洗衣机龙头',img:require('../res/pro/pros3.jpg')},{title:'立式单冷龙头',img:require('../res/pro/pros4.jpg')}
        // ,{title:'瓷芯拖把龙头',img:require('../res/pro/pros5.jpg')}
        // ,{title:'瓷芯十字拖把龙头',img:require('../res/pro/pros6.jpg')}
        // ,{title:'瓷芯龙头',img:require('../res/pro/pros6.jpg')}];

        dataSource1 = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            prods: dataSource1.cloneWithRows(this.props.products.data)
        };
    }

    showtoast(text) {
        ToastAndroid.show(text, ToastAndroid.LONG);
    }

    _renderList(prod) {
        return (
            <TouchableHighlight
                underlayColor={'#fff'}
                onPress={this.showtoast.bind(this, prod.productHeaderId)}>
                <View style={styles.listitem}>

                    <View style={styles.stylecenter}>
                        <Image source={{
                            uri: prod.fileProperties[0] ? prod.fileProperties[0].url + "/" + prod.fileProperties[0].fileName
                                : HOST + "/eihView/images/img_default.png"
                        }}
                               style={[{
                                   width: ScreenWidth / 2 - 10,
                                   height: ScreenWidth / 2 - 10,
                                   justifyContent: 'center'
                               }, {resizeMode: 'contain'}]}/>
                    </View>
                    <Text numberOfLines={1} style={{fontSize: 15, marginTop: 5}}>{prod.productName}</Text>
                    <Text>{prod.productNumber}</Text>
                    <Text style={{fontSize: 15, color: 'red'}}>{prod.brandPrice}</Text>
                </View>
            </TouchableHighlight>);

    }

    render() {
        return (
            <View>
                <ListView contentContainerStyle={styles.list} dataSource={this.state.prods}
                          renderFooter={this.props.footer}
                          renderHeader={this.props.header}
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
        justifyContent: 'flex-start'

    },
    listitem: {
        width: ScreenWidth / 2 - 5,
        height: ScreenWidth / 2 + 80,
        justifyContent: 'center',
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d7d7db',
        margin: 2,
    },
    stylecenter: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export {ProductList as default}
