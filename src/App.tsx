import ClassCard from "./components/ClassCard"
import type { FitnessClass } from './types/FitnessClass'
import { useState } from 'react'

const classes: FitnessClass[] = [
  { id: 1, title: 'Aerobics', teacher: 'Kenneth', capacity: 10},
  { id: 2, title: 'Yoga', teacher: 'Jess', capacity: 13},
  { id: 3, title: 'Zumba', teacher: 'Natalie', capacity: 20},
  { id: 4, title: 'Karate', teacher: 'Yoong', capacity: 15},
]

function App() {
  const [search, setSearch] = useState('') //search holds the current search text, set search updates it, '' starts it empty
  const filteredClasses = classes.filter((fitnessClass) =>
    fitnessClass.title.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <main>
      <h1>Fitness Class Booking</h1>
      <p>Welcome to your Fitness class!</p>
      <label htmlFor="class-search">Search classes</label>
      <input 
        id="class-search"
        type="search"
        value={search} //displays the current state
        onChange={(event) => setSearch(event.target.value)}
      />
      {filteredClasses.length === 0 && (
        <p>No classes match your search</p>
      )}
      {filteredClasses.map((item) => (
        <ClassCard 
          key={item.id}
          fitnessClass={item}
        />
      ))}
    </main>
  )
}

export default App