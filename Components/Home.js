import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Search from './Search';
import ListItem from './ListItem';

export default class HomeScreen extends React.Component {
  
  render() {

    const { onClick, baseState, updateInputValue, onClickAdd } = this.props.screenProps
    const { foods, searchValue } = baseState;

    _renderItem = ({item}) => 
    <ListItem style={styles.list} item={item} onClickAdd={onClickAdd}></ListItem>
    

    
    return (
      <View style={styles.container}>
     <View style={styles.searcbContainer}>
        <Search 
     searchValue={searchValue} 
     updateInputValue={updateInputValue} 
     onClick={onClick}></Search>
     </View>
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
    justifyContent: 'center',
  },
  searcbContainer: {
    alignSelf: 'center',
  }
});