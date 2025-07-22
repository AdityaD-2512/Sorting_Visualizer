export function mergeSort(array){
    const animations = [];
    if(array.length <= 1) return animations;

    const auxiliaryArray = array.slice();   //from this we perform our animations
    const sortedArray = array.slice();  //here our sorted array by using merge sort

    //now from here our mergeSort begins
    mergeSortHelper(sortedArray, 0, sortedArray.length-1, auxiliaryArray, animations);
    return animations;  //2D array in return (1st k-> tells value of idx and other will tell idx and height both)
};

const mergeSortHelper = (sortedArray, startIdx, endIdx, auxiliaryArray, animations) => {
    if(startIdx === endIdx) return;

    const middleIdx = Math.floor((startIdx+endIdx) / 2);

    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, sortedArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx+1, endIdx, sortedArray, animations);

    doMerge(sortedArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
};

const doMerge = (sortedArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx+1;

    while(i <= middleIdx && j<= endIdx){
        //push two idx that are being compared
        animations.push([i,j]);     //for changing bars color..

        //push two indices again, to change their color back
        animations.push([i,j]);

        if(auxiliaryArray[i] <= auxiliaryArray[j]){
            //push idx and its new height
            animations.push([k, auxiliaryArray[i]]);
            sortedArray[k++] = auxiliaryArray[i++]; //update the sortedArray copy
        }else{
            //push idx and its new height
            animations.push([k,auxiliaryArray[j]]);
            sortedArray[k++] = auxiliaryArray[j++]; //updated the sortedArray copy
        }
    }

    while(i<=middleIdx){ //when swapping and when to change/swap the height of bars
        animations.push([i,i]); //2 times pushing because we can change exact color of animations from this
        animations.push([i,i]);

        animations.push([k, auxiliaryArray[i]]);
        sortedArray[k++] = auxiliaryArray[i++]; //updated the sortedArray copy
    }

    while(j <= endIdx){
        animations.push([j, j]);
        animations.push([j, j]);

        animations.push([k, auxiliaryArray[j]]);
        sortedArray[k++] = auxiliaryArray[j++]; //update the sortedArray copy
    }
}