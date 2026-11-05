import ClassCard from "./components/ClassCard"

function App() {
  return (
    <main>
      <h1>Fitness Class Booking</h1>
      <p>Welcome to your Fitness class!</p>
      <ClassCard title="Aerobics" teacher="Kenneth" capacity={10}/>
      <ClassCard title="Yoga" teacher="Jess" capacity={13} />
      <ClassCard title="Zumba" teacher="Natalie" capacity={20} />
    </main>
  )
}

export default App