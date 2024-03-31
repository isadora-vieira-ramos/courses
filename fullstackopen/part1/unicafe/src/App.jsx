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
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive}></Statistics>
    </div>
  )
}

const StatisticsTable = ({text, value}) => {
  return (<tr>
    <td>{text} {value}</td>
  </tr>)
}

const StatisticsLine = ({text, value}) =>{
  return (<div>
    <p>{text} {value}</p>
  </div>)
}

const Statistics = ({good, neutral, bad, average, positive}) => {
  if (good == 0 && neutral == 0 && bad == 0){
    return (<div>
      No feedback given
    </div>)
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticsTable text={"Good"} value={good}></StatisticsTable>
          <StatisticsTable text={"Neutral"} value={neutral}></StatisticsTable>
          <StatisticsTable text={"Bad"} value={bad}></StatisticsTable>
          <StatisticsTable text={"Average"} value={average}></StatisticsTable>
          <StatisticsTable text={"Positive"} value={positive}></StatisticsTable>
        </tbody>
      </table>
    </div>
  )

}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default App
