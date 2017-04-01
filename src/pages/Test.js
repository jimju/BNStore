'use strict'
import React, {Component} from 'react';
import {
    Text, StyleSheet, View, Modal, TouchableHighlight, Dimensions
} from 'react-native';
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
            <View style={{marginTop: 22}}>
                <Modal
                    style={{
                        borderRadius: 5,
                        height: 100,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        backgroundColor: '#33333333',
                        flex: 1,
                        overflow: 'hidden'
                    }}
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: false});
                    }}>
                    <View style={{
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,.3)',
                        flex: 1,
                        justifyContent: 'flex-end'
                    }}>
                        <View style={{width: ScreenWidth, height: 266, backgroundColor: 'white'}}>
                            <View>
                                <Text>Hello World!</Text>
                                <TouchableHighlight onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                    </View>
                </Modal>

                <TouchableHighlight onPress={() => {
                    this.setModalVisible(true)
                }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
    }
});
export {Test as default};
