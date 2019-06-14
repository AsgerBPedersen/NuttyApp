import React from 'react';
import HomeScreen from './Components/Home';
import DetailsScreen from './Components/Details';
import Swiper from 'react-native-swiper';
import { API_KEY, API_ID, DB_API } from 'react-native-dotenv';



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
      searchValue: "",
      isLoggedIn: false,
      token: "",
      username: "",
      password: "",
      loginMessage: ""
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

  updateUsername = e => {
    this.setState({ username: e });
  }

  updatePassword = e => {
    this.setState({ password: e });
  }
 
  onClickSave = () => {
      const query = `mutation {
        createFood(dailyIntake: {name:"testfraapp", kcal:${this.state.totalKcal}, protein: ${this.state.totalProtein}, fat: ${this.state.totalFat}, carbs: ${this.state.totalCarbs}, date:"${new Date().toISOString()}"}) {
          name
        }
      }`;
      this.fetchDailyIntake(query);
  }

  fetchDailyIntake = query => {
    const url = `${DB_API}`;
    const params = {
      headers:{
        'Authorization': `bearer ${this.state.token}`,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({ query }),
      method:'POST'
    };
    fetch(url, params)
    .then(response => response.json())
    .then(data => console.log(JSON.stringify(data)))
    .catch(err => console.log(err));

  }
 
  onClickLogin = () => {
    const query = `query {
        login(email:"${this.state.username}" password:"${this.state.password}") {
           token
           userId 
          } 
        }`;
    this.fetchLogin(query);
  }

  fetchLogin = query => {
    const url = `${DB_API}`;
    const params = {
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({ query }),
      method:'POST'
    };
    fetch(url, params)
    .then(response => response.json())
    .then(data => this.login(data))
    .catch(err => console.log(err));

  }

  login = res => {
      if (res.errors) {
        this.setState({loginMessage: res.errors[0].message})
        return
      } else {
        this.setState({token: res.data.login.token, isLoggedIn: true, loginMessage: "" });
        console.log(this.state.isLoggedIn, this.state.token);
      }
  }

  onClickLogout = () => {
    this.setState({token: "", username: "", password: "", isLoggedIn: false});
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

  onClickAdd = (foodItem, amount) => {
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
        <DetailsScreen screenProps={{baseState:this.state, updateUsername:this.updateUsername, updatePassword:this.updatePassword, onClickSave:this.onClickSave, onClickLogout:this.onClickLogout, onClickLogin:this.onClickLogin, onClick:this.onClick, updateInputValue:this.updateInputValue, onClickAdd:this.onClickAdd}}></DetailsScreen>
      </Swiper>
    )
  }
}
