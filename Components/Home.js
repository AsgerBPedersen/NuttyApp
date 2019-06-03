import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import Search from './Search';
import ListItem from './ListItem';

export default class HomeScreen extends React.Component {
  
  render() {

    const { onClick, baseState, updateInputValue, onClickAdd } = this.props.screenProps
    const { foods, searchValue } = baseState;

    _renderItem = ({item}) => 
    <ListItem item={item} onClickAdd={onClickAdd}></ListItem>
    

    return (
      <View style={styles.container}>
        <Search 
     searchValue={searchValue} 
     updateInputValue={updateInputValue} 
     onClick={onClick}></Search>
     
     <FlatList
       data={foods.map((f, index) => { return {key: f.foodId+index, foodItem: f};})}
       renderItem = {_renderItem}
     />
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