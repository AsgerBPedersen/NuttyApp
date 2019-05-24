import React from 'react';
import { Text,TextInput, View, Button } from 'react-native';

export default class ListItem extends React.Component {
    state = {
        amount: ""
    }
    updateAmountValue = e => {
        this.setState({ amount: e });
      }
    render() {
        return (
        <View>
        <Text>{this.props.item.foodItem.label}</Text>
        <Text>kcal: {this.props.item.foodItem.nutrients.ENERC_KCAL}</Text>
        <TextInput placeholder="enter amount in grams" onChangeText={(value) => this.updateAmountValue(value)} value={this.state.amount} keyboardType={'numeric'}></TextInput>
        <Button title="Add" onPress={() => this.props.onClickAdd(this.props.item.foodItem, this.state.amount)}></Button>
        </View>
        );
  }
}