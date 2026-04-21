import { useState } from 'react'

const Header = ({ label }) => <h2>{label}</h2>

const Button = ({ label, handleClick}) => <button onClick={handleClick}>{label}</button>

const Statistics = ({good, neutral, bad}) => {
    const sum = good + neutral + bad
    let average = 0
    if (sum === 0) {
        average = 0
    } else {
        average = (good - bad) / sum
    }

    let positive = 0
    if (sum === 0) {
        positive = 0
    } else {
        positive = good / sum * 100
    }

    if (good === 0 && neutral === 0 && bad === 0) {
	return <div>No feedback given</div>
    } else {
    return (
	<table>
	    <tbody>
	    	<tr>
	    	    <td>good</td>
	    	    <td>{good}</td>
	    	</tr>
	    	<tr>
	    	    <td>neutral</td>
	    	    <td>{neutral}</td>
	    	</tr>
	    	<tr>
	    	    <td>bad</td>
	    	    <td>{bad}</td>
	    	</tr>
	    	<tr>
	    	    <td>all</td>
	    	    <td>{sum}</td>
	    	</tr>
	    	<tr>
	    	    <td>average</td>
	    	    <td>{average}</td>
	    	</tr>
	    	<tr>
	    	    <td>positive</td>
	    	    <td>{positive}</td>
	    	</tr>
	    </tbody>
	</table>
    )
    }
}

const StatisticLine = ({label, value}) => <p>{label}: {value}</p>

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
      <Button label={goodLabel} handleClick={() => handleClick(goodLabel)} />
      <Button label={neutralLabel} handleClick={() => handleClick(neutralLabel)} />
      <Button label={badLabel} handleClick={() => handleClick(badLabel)} />
      <Header label='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
