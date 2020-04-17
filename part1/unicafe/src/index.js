import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const noFeedback = () => (good+neutral+bad === 0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral+1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad+1)} text={"bad"} />

      <h1>statistics</h1>

      {noFeedback() ? <div>No feedback given</div> : 
          <Statistics good={good} neutral={neutral} bad={bad} />
      }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)