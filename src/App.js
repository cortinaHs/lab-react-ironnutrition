import './App.css';
import foods from './foods.json';
import { Row, Divider, Button } from 'antd';
import { useState } from 'react';
import FoodBox from './components/FoodBox';
import AddFoodForm from './components/AddFoodForm';
import Search from './components/Search';


function App() {

  const [food, setFood] = useState(foods)
  const [searchResults, setSearchResults] = useState([])
  const [searchInput, setSearchInput] = useState("")

  const [showForm, setShowForm] = useState(false);


  const toggleShowForm = () => setShowForm(!showForm);

  const addFood = (food) => {
    setFood( (prevFoodList) => {
      return [food, ...prevFoodList];
    });
  }

  const searchFood = (str) => {
    setSearchInput(str)
    setSearchResults(food.filter((element) => element.name.trim().toLowerCase().includes(str.trim().toLowerCase())))
   }

  const deleteFood = foodIndex => {
    setFood( (prevFoodList) => {
    return prevFoodList.filter((element, index) => index !== foodIndex);
    });
  }

  return (
    <div className="App">
      {showForm && <AddFoodForm addFood={addFood}/>}
  
      <Button onClick={toggleShowForm}>{showForm ? "Hide Form" : "Add New Food"}</Button>

      <Search searchFood={searchFood}/>

      <Divider>Food List</Divider>

      <Row style={{ width: '100%', justifyContent: 'center' }}>

      {(searchResults.length === 0 && !searchInput)
      ?
      <>        
      {(food.length > 0) 
        ? 
        food.map((food, index) => <FoodBox food={food} key={index} index={index} deleteFood={deleteFood}/>)
        :
        <p>Oops! There is no more content to show.</p>}
      </>
      : 
      <>
        {(searchResults.length !== 0)
        ? 
        searchResults.map((food, index) => <FoodBox food={food} key={index} index={index} deleteFood={deleteFood}/>)
        :
        <p>Oops! There is no content matching your search.</p>}
      </>
   
      }
        

      </Row>
    </div>
  );
}

export default App;
