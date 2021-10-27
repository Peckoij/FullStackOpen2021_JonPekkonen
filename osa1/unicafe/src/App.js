import React, { useState } from 'react'
 

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button handleClick={() => setGood(good +1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <h2>statistics</h2>
      <Statistics bad={bad} good={good} neutral={neutral} />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const Statistics = (props) => {
  const totalVotes = () => {
    return props.bad + props.neutral + props.good
  }
  const avgVotes = () => {
    return (props.bad * -1 + props.neutral * 0 + props.good * 1) / (props.bad + props.neutral + props.good)
  }

  const posVotes = () => {
    return (props.good / totalVotes())
  }

  if (totalVotes() === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
  <table>
    <tbody>
    <StatisticLine name="good" value={props.good} />
    <StatisticLine name="neutral" value={props.neutral} />
    <StatisticLine name="bad" value={props.bad} />
    <StatisticLine name="all" value={totalVotes()} />
    <StatisticLine name="average" value={avgVotes()} />
    <StatisticLine name="positive" value={posVotes()+ " %"}/>
    </tbody>
  </table>
  )
}

const StatisticLine = (props) => {

  return(
    <tr>
      <td>{props.name} </td>
      <td>{props.value}</td>
    </tr>
  )
}

export default App