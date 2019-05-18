import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { API_KEY, API_ID } from 'react-native-dotenv';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      searchValue: ""
    }  
  }
  generateUrl = params => {
    const newUrl = `https://api.edamam.com/api/food-database/parser?ingr=${params}&app_id=${API_ID}&app_key=${API_KEY}`;
    console.log(newUrl);
    return newUrl
  }
  updateInputValue = e => {
    this.setState({ searchValue: e });
  }
  
  fetchFood = url => {
    fetch(url)
    .then(response => response.json())
    .then(data => this.storeFood(data))
    .catch(error => console.log(error));
  }

  storeFood = data => {
    const food = data.hints.map(hint => {
      const { foodId, label, nutrients } = hint.food;
      return { foodId, label, nutrients };
    });
    this.setState({foods: food});
  }

  onClick = () => {
    const url = this.generateUrl(this.state.searchValue);
    this.fetchFood(url);
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
        onChangeText={(value) => this.updateInputValue(value)}
        placeholder="search here" value={this.state.searchValue}></TextInput>
        <Button onPress={this.onClick} title="Search"></Button>
        <FlatList
  data={this.state.foods.map(f => { return {key: f.foodId, name: f.label};})}
  renderItem={({item}) => <Text>{item.name}</Text>}
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
