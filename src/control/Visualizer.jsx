import React from 'react'
import "./Visualizer.css"

function Visualizer({array}){
    
    return (
        <div className='array-container'>
            {array.map((item, index) => (
                <div key={index} className='bar' style={{height : `${item}px`}}>{item}</div>      //item indicates the value in array one by one(so that height can be different according to the value of element in array)
            ))}
        </div>
    )
}

export default Visualizer