import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import Search from './Search';

export default class HomeScreen extends React.Component {
  render() {
    const { onClick, baseState, updateInputValue, onClickAdd } = this.props.screenProps
    const { foods, searchValue, testId } = baseState;
    return (
      <View style={styles.container}>
        <Search searchValue={searchValue} updateInputValue={updateInputValue} onClick={onClick}></Search>
        <FlatList
          data={foods.map((f, index) => { return {key: f.foodId+index, name: f.label};})}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
        <Text>{testId}</Text>
        <Button title="ADD" onPress={onClickAdd}></Button>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
      
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});