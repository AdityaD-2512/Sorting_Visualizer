import React from "react";
import './Visualizer.css'

function Control({speed,setSpeed, reSet, selectedSorting, handleNewArrayGenerate , handleSorting, userInputArray, setUserInputArray}){
    return (
        <div className="controls-container">
            <div className="input-wrapper">
                <input type='text' value={userInputArray} onChange={(e) => setUserInputArray(e.target.value)} className="neumorphic-input" placeholder="Enter your Array between 1-500"></input>
                <div className="info-icon-wrapper">
                    <i className="info-icon">i</i>
                    <span className="tooltip-text">Provide your array by comma seperated integer</span>
                </div>
            </div>

            <button className='neu-button' onClick={handleNewArrayGenerate}>Generate new Array</button>
            <button className="neu-button" onClick={reSet} >
                Reset
            </button>
            <select className="neumorphism-dropdown" value={selectedSorting} onChange={handleSorting}>
                <option value=''>Select Sorting</option>
                <option value='bubbleSort'>Bubble Sorting</option>
                <option value='mergeSort'>Merge Sorting</option>
            </select>

            <label>
                speed :
                <input
                    type="range"
                    min="10"
                    max="200"
                    className="speedControl"
                    onChange={(e) => setSpeed(200 - e.target.value)}
                />
            </label>
        </div>
    )
}

export default Control