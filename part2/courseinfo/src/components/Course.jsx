const Header = (props) => <h2>{props.course}</h2>

const Content = ({ parts }) => (
  <div>
    { parts.map(part => <Part key={part.id} part={part} />) }
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ total }) => <h3>Total of {total} exercises</h3>

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={
          course.parts.reduce((accum, currentPart) => accum + currentPart.exercises, 0)
        }
      />
    </div>
  )
}

export default Course