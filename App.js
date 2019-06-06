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
      totalKcal: 0,
      totalProtein: 0,
      totalFat: 0,
      totalCarbs: 0,
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
    let newFoodItem = Object.create(foodItem);
    newFoodItem.amount = amount;
    newInv.push(newFoodItem);
    this.setState({foodInventory : newInv});
    this.setState({totalKcal: this.state.foodInventory.reduce((prev, curr) => {
      return prev + curr.nutrients.ENERC_KCAL * (curr.amount/100);
      }, 0)
    });
    this.setState({totalProtein: this.state.foodInventory.reduce((prev, curr) => {
      return prev + curr.nutrients.PROCNT * (curr.amount/100);
      }, 0)
    });
    this.setState({totalFat: this.state.foodInventory.reduce((prev, curr) => {
      return prev + curr.nutrients.FAT * (curr.amount/100);
      }, 0)
    });
    this.setState({totalCarbs: this.state.foodInventory.reduce((prev, curr) => {
      return prev + curr.nutrients.CHOCDF * (curr.amount/100);
      }, 0)
    });
  
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
