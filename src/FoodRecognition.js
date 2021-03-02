import React from 'react';

const FoodRecognition = ({imageUrl, list}) => {
  return(
     <div className='center ma'>
       <div className='absolute mt2'>
       <img className='center' alt='' src={imageUrl} width='500px' heigh='auto'/>

       <ol>{list.map(v=>(
         <li className='br3 ba grow shadow-5 ma2 pa3 dib bg-green'>{v.name}{':'}{v.value}</li>
       )) } 
       </ol>
       </div>
     </div>
     
  )
}

export default FoodRecognition;