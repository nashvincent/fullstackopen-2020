import React from "react"

const Statistic = ({ text, value }) => {
    const percentage = () => text === "positive" ? "%" : null
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
            <td>{percentage()}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {

    const avg = () => {
        return (good + (-1*bad))/(good+neutral+bad)
    }

    const positive = () => {
        return (good/(good+neutral+bad))*100
    }

    return (
        <table>
            <tbody>
                <Statistic text="good" value={good} />
                <Statistic text="neutral" value={neutral} />
                <Statistic text="bad" value={bad} />

                <Statistic text="all" value={good+neutral+bad} />
                <Statistic text="average" value={avg()} />
                <Statistic text="positive" value={positive()} />
            </tbody>
        </table>
    )
}

export default Statistics;