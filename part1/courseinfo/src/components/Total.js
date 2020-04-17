import React from "react"

const Total = ({ parts }) => {
    // use forEach to get the total number of exercises i guess
    let sum = 0;

    parts.forEach(part => sum += part.exercises)

    return (
        <p>Number of exercises {sum}</p>
    )
}

export default Total;