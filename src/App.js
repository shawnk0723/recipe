import React, {useEffect, useState} from "react"; 
import Clarifai from 'clarifai';
import Recipe from './Recipe';
import Recipe2 from './Recipe2';
import './App.css';

let flag = 0;

const app = new Clarifai.App({
 apiKey: '3b5f87699b934437bb5895d280263353'
});

function App() {
  
  const APP_ID = "0ab474a2";
  const APP_KEY = "af5797c3d30b77edc47c80a3ca335610";
 
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  
  useEffect(() => {
    if(query.includes('http')){
      getImage()
    }
    getRecipes()
  }, [query])
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    flag=0
    setRecipes(data.hits)
    }

  const getImage = () => {
    app.models.predict(Clarifai.FOOD_MODEL, query)
    .then(response => {
       flag=1
       setRecipes(response.outputs[0].data.concepts)
    })
  }
  
  const updateSearch = e => {
    setSearch(e.target.value);
  }
  
  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
      <div className="text"> Please type the name of a food or image url here => </div>
        <input className="search-bar" type='text' value={search} onChange={updateSearch} />
        <button className="search-button"  type="submit">Search</button>
      </form>
      <div className="recipes">
      {flag ? <Recipe2 image={query} list={recipes}/> : recipes.map(recipe => 
        <Recipe key={recipe.recipe.uri } title={recipe.recipe.label} calories={recipe.recipe.calories} 
         image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}
        />  
      )}
      </div>
    
    </div>
  );
}

export default App;
