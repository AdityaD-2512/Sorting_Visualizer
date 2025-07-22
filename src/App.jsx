import React, { useEffect, useState } from 'react';
import './App.css';
import Visualizer from './control/Visualizer';
import Control from './control/Control';
import { bubbleSort } from './algorithm/BubbleSort';
import { mergeSort } from './algorithm/MergeSort';

function App() {
  const [array, setArray] = useState([]); //at start we have empty array
  const [userInputArray, setUserInputArray] = useState(''); //for state change when user input the array by their own
  const [speed, setSpeed] = useState(100);  //for speed
  const [selectedSorting, setSelectedSorting] = useState('');

  //we have to use dependency that what user have entered so use use useEffect here... (for getting user input) main step for user input
  useEffect(() => {
    const userInput = userInputArray.split(',');  //expecting that user will give comma seperated value
    const filterInput = userInput.map(item => parseInt(item))
    .filter(num => !isNaN(num) && num <= 500 && num>0); //filter so that our user input is not a NAN or only integer is taken as input
    console.log(filterInput, 'this is user input');
    //now till here we take input array only put in setArray so that our generated array is now in form of bars and content in screen also
    setArray([...filterInput]);
  
  }, [userInputArray])
  

  const handleNewArrayGenerate = () =>{         /*here we created Array.from where we have to give length/size and no. of element in array we wanted to generate in callback function*/
    const newArray = Array.from({length : 20}, () =>
      Math.floor(Math.random() * 500)
    )
    setArray(newArray);
  }


 const reSet = () => {
    setArray([])
    setSelectedSorting('')
  };

  const handleSorting = (e) =>{
    // console.log(e.target.value);
    const sortingMethod = e.target.value;   /*value which we select in select dropdown*/
    setSelectedSorting(sortingMethod);
    switch(sortingMethod){
      case 'bubbleSort' : 
        const animationArr = bubbleSort(array); 
        bubbleAnimation(animationArr);
        break;

      case 'mergeSort' : 
        const animationArr1 = mergeSort(array); //form our mergeSort function value stored in this variable
        mergeAnimation(animationArr1);
        break; 

      default :
      break;
    }
  }


  function mergeAnimation(animations){
    console.log(animations);

    const bars = document.getElementsByClassName('bar');
    for(let i=0; i<animations.length; i++){
      const isColorChange = i%3 != 2; //every 3rd element is responsible for height change (everyh 1st and 2nd element responsible for color change according to analysis)
      if(isColorChange){
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = bars[barOneIdx];
        const barTwo = bars[barTwoIdx];
        const color = i%3 === 0 ? 'yellow' : 'blue';
        setTimeout(() => {  //if not 3rd element we chnaging its color else its height
          barOne.style.backgroundColor = color;
          barTwo.style.backgroundColor = color;
        }, i*speed);
      }else{
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOne = bars[barOneIdx];
          barOne.style.height = `${newHeight}px`;
          barOne.innerText = newHeight;
        }, i*speed);
      }
    }

    setTimeout(() => {  //when whole sorting performed now we have to set all bars color to green
      for(let j=0; j<bars.length; j++){
        setTimeout(()=>{
          bars[j].style.backgroundColor = 'green';
        }, j*speed);
      }
    }, animations.length * speed);
  };


  function bubbleAnimation(animation){
    const barEle = document.getElementsByClassName('bar');
    for(let i=0; i<animation.length; i++){ //if swap is true we change the bar color
      let [barOneIdx, barTwoIdx, swap] = animation[i]; //by destructuring it we get aur value of that element
      let barOne = barEle[barOneIdx];
      let barTwo = barEle[barTwoIdx];
      // console.log(barOne, 'this', barTwo);

      setTimeout(() => {
        barOne.style.backgroundColor = swap ? 'red' : 'yellow';
        barTwo.style.backgroundColor = swap ? 'red' : 'yellow';
        if(swap){
          const heightTemp = barOne.style.height; //due to this 3 line height sorted but the content inside bar is still there at its original position means not sorted after this same logic we write for our content also
          barOne.style.height = barTwo.style.height;
          barTwo.style.height = heightTemp;

          const content = barOne.innerText;
          barOne.innerText = barTwo.innerText;
          barTwo.innerText = content;
        }

        setTimeout(() => {  //so that when color of bar changes it takes some time
          barOne.style.backgroundColor = 'blue';
          barTwo.style.backgroundColor = 'blue';
        }, speed)
        
      }, i*speed)
    }

    //till here our array is sorted... now when it is sorted making all bars green color
    setTimeout(()=>{
      for(let j=0; j<barEle.length; j++){
        setTimeout(() => {
          barEle[j].style.backgroundColor = 'green';
        }, j * speed)
      }
    }, animation.length * speed)
  }

  return (
    <div className='App'>
      <h1>Sorting Visualizer</h1>
      <Control 
      handleNewArrayGenerate={handleNewArrayGenerate}
      handleSorting = {handleSorting}
      userInputArray = {userInputArray}   //when user input array by their own (that usestate is used here)
      setUserInputArray = {setUserInputArray}
      setSpeed={setSpeed}
      speed={speed}
      reSet={reSet}
      selectedSorting={selectedSorting}
      />    {/*calling and pass the function handleNewArrayGen in Control*/} 
      <Visualizer array={array}/> 
    </div>
  )
}

export default App;
