import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';


export default class DetailsScreen extends React.Component {

render() {
    const { onClick, baseState, updateInputValue, onClickAdd } = this.props.screenProps;
    const { foodInventory, totalKcal, totalProtein, totalFat, totalCarbs } = baseState;
    
    return (
            <View style={styles.container}>
                <Text>daily intake</Text>
                <Text>Kcal: {totalKcal}</Text>
                <Text>Protein: {Math.round(totalProtein)}</Text>
                <Text>Fat: {Math.round(totalFat)}</Text>
                <Text>Carbs: {Math.round(totalCarbs)}</Text>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      backgroundColor: '#fefefe',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });