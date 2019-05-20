import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';


export default class DetailsScreen extends React.Component {

render() {
    const { onClick, baseState, updateInputValue, onClickAdd } = this.props.screenProps;
    const { foods, searchValue, testId } = baseState;
    return (
            <View>
                <Text>{testId}</Text>
        <Button title="ADD" onPress={onClickAdd}></Button>
            </View>
            );
    }
}