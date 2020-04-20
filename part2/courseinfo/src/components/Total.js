import React from "react"

const Total = ({ parts }) => {
    const sum = parts.reduce((acc, obj) => acc + obj.exercises, 0)    // Second arg is the initialValue

    return(
      <h3>total of {sum} exercises</h3>
    ) 
  }

export default Total;