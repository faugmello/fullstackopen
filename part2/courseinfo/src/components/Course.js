const Course = ({course}) => (
    <div>
        <CourseHeader text={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

const CourseHeader = ({text}) => (<h2>{text}</h2>)


const Content = ({parts}) => (
    <div>
        { parts.map(part => <Part key={part.id} part={part}/>) }
    </div>
)

const Part = ({part}) => (<p>{part.name} {part.exercises}</p>)

const Total = ({parts}) => (<p><b>total of {parts.reduce((acc, current) => acc + current.exercises, 0)} exercises</b></p>)

export default Course
