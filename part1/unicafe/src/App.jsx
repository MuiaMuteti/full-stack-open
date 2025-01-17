import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalFeedback =  good + neutral + bad
  const average = ((good - bad) / totalFeedback).toFixed(2)
  const positiveFeedback = (good / totalFeedback * 100).toFixed(2)

  if (totalFeedback === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={totalFeedback} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={positiveFeedback + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
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
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text={"Good"} />
      <Button handleClick={handleNeutralClick} text={"Neutral"} />
      <Button handleClick={handleBadClick} text={"Bad"} />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
