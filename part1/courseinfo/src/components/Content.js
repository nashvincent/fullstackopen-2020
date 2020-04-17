import React from "react"
import Part from './Part';

const Content = ({ parts }) => {
    const partList = parts.map(item => <Part part={item.name} exercise={item.exercises} />)

    return (
        <div>
            {partList}
        </div>
    )
}

export default Content