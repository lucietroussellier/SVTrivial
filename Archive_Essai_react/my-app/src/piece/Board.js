import React, { useState } from 'react';
import Case from './Case.js';


const ClassicBoard = () =>{
  const categoryList = [4,0,5,2,0,3,6,3,0,4,1,0,2,5,2,0,3,6,0,1,4,1,0,2,5,0,6,3,6,0,1,4,0,5,2,5,0,6,3,0,4,1,4,0,5]
  const typeList = Array(42).fill(null).map((_,index) => (index-4)%6==0? 1:0) 
  
  const CircleCase = Array(42).fill(null).map((_,index) => {
    if (typeList[index]==1) { 
      //return <Case key={index} type={`type-camembert-${index}`} category={categoryList[index]} size={500} angle={(index-3)/7*60+30}  />
      return <Case key={index} type={`type-camembert-${index}`} category={categoryList[index]} size={500} angle={210}  />
    
    }
    else {
      //return <Case key={index} type={`type-normal-${index}`} category={categoryList[index]} size={500} angle={(index)*7.2}  />
      return <Case key={index} type={`type-normal-${index}`} category={categoryList[index]} size={500} angle={210}  />
    }
  }
  )
  //console.log(typeList)
  console.log(CircleCase)
  //const typeList = [0,0,0,1,0,0,0,0,0,0,1..]
  return (
  <div  className="board">
      {<Case key={0} type={`type-normal-${1}`} category={categoryList[1]} size={500} angle={0}/>}
      {<Case key={1} type={`type-normal-${1}`} category={categoryList[1]} size={500} angle={10}/>}
      {<Case key={2} type={`type-normal-${2}`} category={categoryList[2]} size={500} angle={20}/>}
      
      {<Case key={2} type={`type-camembert-${2}`} category={categoryList[2]} size={500} angle={0}/>}
    
    </div>
  );
}


const Board = () => {
  return (ClassicBoard());
};


export default Board;
