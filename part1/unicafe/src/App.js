import './App.css';
import { useState } from 'react'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}

const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad
    const average = props.good - props.bad
    const positive = props.good / all * 100

    if (all > 0) {
        return (
            <table>
                <tbody>
                    <StatisticLine text='good' value={props.good} />
                    <StatisticLine text='neutral' value={props.neutral} />
                    <StatisticLine text='bad' value={props.bad} />
                    <StatisticLine text='all' value={all} />
                    <StatisticLine text='average' value={average} />
                    <StatisticPositiveLine value={positive} />
                </tbody>
            </table>
        )
    } else {
        return (
            <span>No feedback given</span>
        )
    }
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const StatisticPositiveLine = (props) => {
    return (
        <tr>
            <td>positive</td>
            <td>{props.value} %</td>
        </tr>
    )
}

export default App;
