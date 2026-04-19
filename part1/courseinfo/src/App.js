const Header = (props) => (
    <h1>{props.courseName}</h1>
)

const Content = (props) => (
    <div>
        <Part partName={props.part1} partExercises={props.part1exercises}/>
        <Part partName={props.part2} partExercises={props.part2exercises}/>
        <Part partName={props.part3} partExercises={props.part3exercises}/>
    </div>
)

const Part = (props) => (
    <p>{props.partName} {props.partExercises}</p>
)

const Total = (props) => (
    <p>Number of exercises {props.exercisesTotal}</p>
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
            <Header courseName={course}/>
            <Content part1={part1} part1exercises={exercises1} part2={part2} part2exercises={exercises2} part3={part3}
                     part3exercises={exercises3}/>
            <Total exercisesTotal={exercises1 + exercises2 + exercises3}/>
        </>
    )
}

export default App
