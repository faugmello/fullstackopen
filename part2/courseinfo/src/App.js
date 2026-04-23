const Course = ({course}) => (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
)

const Header = ({text}) => (<h1>{text}</h1>)

const Content = ({parts}) => (
    <div>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </div>
)

const Part = ({part}) => (<p>{part.name} {part.exercises}</p>)

const Total = ({parts}) => (<p><b>total of {parts[0].exercises + parts[1].exercises + parts[2].exercises} exercises</b></p>)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
