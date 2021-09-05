import './App.css';
import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';

function App() {

  const APP_ID = 'ae2e92ed';
  const APP_KEY = '0ae64aa7eac78e0c38f5d84a4c0c6f38	';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('');

  useEffect(()=>{
    console.log('useeffect ran')
    getRecipes();
  },[query])

 const getRecipes = async () =>{
   const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)

   const data = await response.json();
    console.log(data.hits);
   setRecipes(data.hits);
 }

 const updateChange = (e) =>{
   setSearch(e.target.value);
   
 }

 const submitClicked =(e) =>{
   e.preventDefault();
   setQuery(search);
   setSearch('');
 }
  return (
    <div className="App">
    <form className='search-form' onSubmit={submitClicked}>
      <input className='search-bar' type='text' value={search} onChange={updateChange }/>
      <button className='search-button' type='submit'>search</button>
    </form>
    <div className="recipes">
    {recipes.map(recipe =>(
      <Recipe title={recipe.recipe.label} calories={recipe.recipe.calories} 
      ingredients={recipe.recipe.ingredients}image={recipe.recipe.image} key={recipe.recipe.label}/>
    ))}
    </div>
    </div>
  );
}

export default App;
