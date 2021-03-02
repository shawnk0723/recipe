 
import React, {useEffect, useState} from "react"; 
import Clarifai from 'clarifai';
import Recipe from './Recipe';
import FoodRecognition from './FoodRecognition'; 

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
  const [image, setImage] = useState('');
  const [query, setQuery] = useState('chicken');
  const [list, setList] = useState([]);
  
  useEffect(() => {
    // console.log('in getRecipes')
    getRecipes()
  }, [query])
  
  useEffect(() => {
    // console.log('in getImage')
    getImage()
  }, [image])
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits)
    }

  
  const display = (list) => {
    setList(list);
  }
  
  const getImage = () => {
    app.models.predict(Clarifai.FOOD_MODEL, image)
    .then(response => {
       display(response.outputs[0].data.concepts)
    })
    flag=1

  }
  
  const updateSearch = e => {
    setSearch(e.target.value);
  }
  
  const getSearch = e => {
    e.preventDefault();
    if(search.includes(".jpg",".png",".jpeg")){
      setImage(search)
      // setSearch(' ')
    }
    else{
    setQuery(search)
    // setSearch(' ')
    }
  }
  
  if (search.includes(".jpg",".png",".jpeg") && flag){
        console.log('flag:',flag)

    
    return(
    <div className="App">
    <form onSubmit={getSearch} className="search-form">
      <div className="text"> Please type the name of a food or image url here => </div>
        <input className="search-bar" type='text' value={search} onChange={updateSearch} />
        <button className="search-button"  type="submit">Search</button>
      </form>
    <div>
    <FoodRecognition list={list} imageUrl={image}/>
    </div>
    </div>
    
    )
   
  }
     flag=0;
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
      <div className="text"> Please type the name of a food or image url here => </div>
        <input className="search-bar" type='text' value={search} onChange={updateSearch} />
        <button className="search-button"  type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.uri } title={recipe.recipe.label} calories={recipe.recipe.calories} 
         image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}
        />  
      ))}
      </div>
    
    </div>
  );
    
}

export default App;
