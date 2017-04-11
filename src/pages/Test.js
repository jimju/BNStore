'use strict'
import React, {Component} from 'react';
import {
    Text, StyleSheet, View, Dimensions
} from 'react-native';
import TitleProductDetail from '../component/TitleProductDetail';
let ScreenWidth = Dimensions.get('window').width;

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleProductDetail {...props} title="测试"/>
                <Text>Hello Test</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor:'white',
        flexDirection: 'column',
    }
});
export {Test as default};
