const Header = (props) => (
    <h1>{props.name}</h1>
)

const Content = (props) => (
    <div>
        <Part part={props.part1} />
        <Part part={props.part2} />
        <Part part={props.part3} />
    </div>
)

const Part = (props) => (
    <p>{props.part.name} {props.part.exercises}</p>
)

const Total = (props) => (
    <p>Number of exercises {props.exercisesSum}</p>
)

const App = () => {
    const course = 'Desenvolvimento de aplicação Half Stack'
    const part1 = {
        name: 'Fundamentos da biblioteca React',
        exercises: 10
    }
    const part2 = {
        name: 'Usando props para passar dados',
        exercises: 7
    }
    const part3 = {
        name: 'Estado de um componente',
        exercises: 14
    }

    return (
        <div>
            <Header name={course}/>
            <Content part1={part1} part2={part2} part3={part3}/>
            <Total exercisesSum={part1.exercises + part2.exercises + part3.exercises}/>
        </div>
    )
}

export default App
