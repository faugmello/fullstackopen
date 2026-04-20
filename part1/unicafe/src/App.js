import { useState } from 'react'

const Header = ({ label }) => <h2>{label}</h2>

const FeedbackButton = ({ label, handleClick}) => <button onClick={handleClick}>{label}</button>

const FeedbackStatistics = ({good, neutral, bad}) => <p>good {good}<br/>neutral {neutral}<br/>bad: {bad}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (feedbackType) => {
    if (feedbackType === 'good') {
      setGood(good + 1)
    }
    if (feedbackType === 'neutral') {
      setNeutral(neutral + 1)
    }
    if (feedbackType === 'bad') {
      setBad(bad + 1)
    }
  }

  const goodLabel = 'good'
  const neutralLabel = 'neutral'
  const badLabel = 'bad'

  return (
    <div>
      <Header label='give feedback'/>
      <FeedbackButton label={goodLabel} handleClick={() => handleClick(goodLabel)} />
      <FeedbackButton label={neutralLabel} handleClick={() => handleClick(neutralLabel)} />
      <FeedbackButton label={badLabel} handleClick={() => handleClick(badLabel)} />
      <Header label='statistics'/>
      <FeedbackStatistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
