const App = () => {
  const course = 'Half Stack application development'
  
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>
  )
}

const Header = (props) =>{
  return (
    <>
     <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) =>{
  return (
    <>
      <Part name={props.parts[0].name} number={props.parts[0].exercises}></Part>
      <Part name={props.parts[1].name} number={props.parts[1].exercises}></Part>
      <Part name={props.parts[2].name} number={props.parts[2].exercises}></Part>
    </>
  )
}

const Part = (props) =>{
  return (
    <>
      <p>
          {props.name} {props.number}
      </p>
    </>
  )
}

const Total = (props) =>{
  return (
    <>
     <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}

export default App