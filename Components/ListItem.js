import React from 'react';
import { Text,TextInput, View, Button, StyleSheet } from 'react-native';

export default class ListItem extends React.Component {
    state = {
        amount: ""
    }
    updateAmountValue = e => {
        this.setState({ amount: e });
      }
    render() {
        return (
        <View style={styles.listItem}>
        <Text>{this.props.item.foodItem.label}</Text>
        <Text>Kcal: {this.props.item.foodItem.nutrients.ENERC_KCAL}</Text>
        <Text>Protein: {this.props.item.foodItem.nutrients.PROCNT}</Text>
        <Text>Fat: {this.props.item.foodItem.nutrients.FAT}</Text>
        <Text>Carbs: {this.props.item.foodItem.nutrients.CHOCDF}</Text>
        <TextInput placeholder="enter amount in grams" onChangeText={(value) => this.updateAmountValue(value)} value={this.state.amount} keyboardType={'numeric'}></TextInput>
        <Button title="Add" onPress={() => this.props.onClickAdd(this.props.item.foodItem, this.state.amount)}></Button>
        </View>
        );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    padding: 45
  },
});