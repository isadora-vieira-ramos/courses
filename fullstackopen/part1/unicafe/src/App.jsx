import { useState } from 'react'
import './App.css'

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0)

  const increaseGood = () => {
    const newGood = good + 1;
    setGood(newGood)
    const newTotal = total + 1
    setTotal(newTotal)
    setPositive((newGood/newTotal) * 100)
    calculateAverage(newGood, bad, newTotal);
  }

  const calculateAverage = (good, bad, total) => {
    let average = (good - bad)/total;
    setAverage(average);
  }
    
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    const newTotal = total + 1
    setTotal(newTotal)
    setPositive((good/newTotal) * 100)
    calculateAverage(good, bad, newTotal)
  }
  const increaseBad = () => {
    const newBad = bad + 1;
    setBad(newBad)
    const newTotal = total + 1
    setTotal(newTotal)
    setPositive((good/newTotal) * 100)
    calculateAverage(good, newBad, newTotal)
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button
        onClick={increaseGood}
        text='Good'
      />
      <Button
        onClick={increaseNeutral}
        text='Neutral'
      />     
      <Button
        onClick={increaseBad}
        text='Bad'
      /> 
      <Statistics text="Good" value={good}></Statistics>
      <Statistics text="Neutral" value={neutral}></Statistics> 
      <Statistics text="Bad" value={bad}></Statistics>
      <Statistics text="Average" value={average}></Statistics>
      <Total total={total} positive={positive}></Total>          
    </div>
  )
}

const Statistics = ({text, value}) => {
  return (<div>
    <p>{text} {value}</p>
  </div>);
}

const Total = ({total, positive}) =>{

  return (<div>
    <p>All: {total}</p>
    <p>Positive {positive}%</p>
  </div>)
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default App
