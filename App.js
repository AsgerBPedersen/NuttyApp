import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import Search from './Search';
import DetailsScreen from './Details';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { API_KEY, API_ID } from 'react-native-dotenv';
class HomeScreen extends React.Component {
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
        <Search searchValue={this.state.searchValue} updateInputValue={this.updateInputValue} onClick={this.onClick}></Search>
        <FlatList
          data={this.state.foods.map((f, index) => { return {key: f.foodId+index, name: f.label};})}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
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

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Details : DetailsScreen
},
{
  initialRouteName: "Home"
});
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return  <AppContainer />
  }
}