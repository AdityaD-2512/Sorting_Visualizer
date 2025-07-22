export function bubbleSort(array){
    let animation = [];
    let tempArray = [...array];  //making a copy of array because we don't want to touch/change original arr

    for(let i=0; i<tempArray.length-1; i++){
        for(let j=0; j<tempArray.length-1; j++){
            if(tempArray[j] > tempArray[j+1]){  //swapping code from this we know when swapping is going to happen and we make aur amimations..
                animation.push([j, j+1, true]);
                let temp = tempArray[j];
                tempArray[j] = tempArray[j+1];
                tempArray[j+1] = temp;
            }else{
                animation.push([j, j+1, false]); //when no swapping is there
            }
        }
    }
    return animation; //we get the array which tells us whether we have to do animation or not
}