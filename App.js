import React from 'react';
import HomeScreen from './Components/Home';
import DetailsScreen from './Components/Details';
import Swiper from 'react-native-swiper';
import { API_KEY, API_ID } from 'react-native-dotenv';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      foodInventory: [],
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
    console.log("works");
    this.fetchFood(url);
  }
  onClickAdd = (foodItem, amount) => {
    console.log("works");
    const newInv = this.state.foodInventory;
    let newFoodItem = foodItem;
    foodItem.amount = amount;
    newInv.push(newFoodItem);
    this.setState({foodInventory : newInv});
    this.state.foodInventory.forEach(element => {
      console.log(element.label);
      console.log(element.amount);
    })
  }
  
  render() {
    return (
      <Swiper>
        <HomeScreen screenProps={{baseState:this.state, onClick:this.onClick, updateInputValue:this.updateInputValue, onClickAdd:this.onClickAdd}}></HomeScreen>
        <DetailsScreen screenProps={{baseState:this.state, onClick:this.onClick, updateInputValue:this.updateInputValue, onClickAdd:this.onClickAdd}}></DetailsScreen>
      </Swiper>
    )
  }
}
