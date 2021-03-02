import React from 'react';
import style from './recipe.module.css';

const Recipe2 = ({image, list}) => {
  return (
    <div  className={style.recipe}>
      <h1>{"Recognized Ingredients"}</h1>
      <img className='center' alt='' src={image} width='500px' heigh='auto'/>
      <h3> {"Name and Accuracy"}</h3>     
      <ol >
        {list.map(el => (   
          <li key={el.id}>{el.name}  : {el.value} %</li>  
        ))}
      </ol>
    </div>
  )
}

export default Recipe2;
 