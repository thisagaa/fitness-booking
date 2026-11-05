import ClassCard from "./components/ClassCard"

const classes = [
  { id: 1, title: 'Aerobics', teacher: 'Kenneth', capacity: 10},
  { id: 2, title: 'Yoga', teacher: 'Jess', capacity: 13},
  { id: 3, title: 'Zumba', teacher: 'Natalie', capacity: 20},
  { id: 4, title: 'Karate', teacher: 'Yoong', capacity: 15},
]

function App() {
  return (
    <main>
      <h1>Fitness Class Booking</h1>
      <p>Welcome to your Fitness class!</p>
      {classes.map((fitnessClass) => (
        <ClassCard 
          key={fitnessClass.id}
          title={fitnessClass.title}
          teacher={fitnessClass.teacher}
          capacity={fitnessClass.capacity}
        />
      ))}
    </main>
  )
}

export default App