const Header = (props) => (
    <div>
        <h1>{props.courseName}</h1>
    </div>
)

const Content = (props) => (
    <div>
        <p>{props.part1} {props.part1exercises}</p>
        <p>{props.part2} {props.part2exercises}</p>
        <p>{props.part3} {props.part3exercises}</p>
    </div>
)

const Total = (props) => (
    <div>
        <p>Number of exercises {props.exercisesTotal}</p>
    </div>
)

const App = () => {
  const course = 'Desenvolvimento de aplicação Half Stack'
  const part1 = 'Fundamentos da biblioteca React'
  const exercises1 = 10
  const part2 = 'Usando props para passar dados'
  const exercises2 = 7
  const part3 = 'Estado de um componente'
  const exercises3 = 14

  return (
    <>
        <Header courseName={course} />
        <Content part1={part1} part1exercises={exercises1} part2={part2} part2exercises={exercises2} part3={part3} part3exercises={exercises3} />
        <Total exercisesTotal={exercises1 + exercises2 + exercises3} />
    </>
  )
}

export default App
