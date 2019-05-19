import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';


export default class Search extends React.Component {

render() {
    return (
            <View>
                <TextInput
                onChangeText={(value) => this.props.updateInputValue(value)}
                placeholder="search here" value={this.props.searchValue}>
                </TextInput>
                <Button onPress={this.props.onClick} title="Search"></Button>
            </View>
            );
    }
}