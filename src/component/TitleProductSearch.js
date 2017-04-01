'use strict'
import React, {
    Component
} from 'react';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    InteractionManager,
    TouchableOpacity,
    Image, Platform
} from 'react-native';


const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 0)
class TitleProductSearch extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            key:''
        }
    }

    _onback() {
        const {navigator} = this.props;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.view}>
                <TouchableOpacity onPress={() => this._onback()}>
                    <Image style={styles.image} source={require('../res/images/back.png')}/>
                </TouchableOpacity>
                <TextInput style={styles.titlttext} autoFocus={this.props.route.focus}
                           multiline={false}
                           onSubmitEditing ={this.props.search}
                           onChangeText={this.props.tc}/>
                <TouchableOpacity onPress={this.props.search}>
                    <Text style={styles.searchtext}>搜索</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titlttext: {
        flex: 1,
        fontSize: 14,
        color: '#ffffff',
        backgroundColor: '#d7d7d788',
        margin: 5,
    },
    view: {
        flexDirection: 'row',
        backgroundColor: '#015ba7',
        height: 50 + STATUS_BAR_HEIGHT,
        paddingTop: STATUS_BAR_HEIGHT,
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        margin: 5,
        paddingRight: 20,
    },
    searchtext: {
        width: 50,
        height: 35,
        padding: 5,
        color: '#fff',
        textAlign: 'center'
    }
});

export {TitleProductSearch as default};
