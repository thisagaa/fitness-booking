import ClassCard from "./components/ClassCard"
import type { FitnessClass } from './types/FitnessClass'
import { useEffect, useState } from 'react'
import { getClasses } from "./services/classService"

function App() {
  const [classes, setClasses] = useState<FitnessClass[]>([])
  const [search, setSearch] = useState('') //search holds the current search text, set search updates it, '' starts it empty
  useEffect(() => {
    async function loadClasses() {
      try {
        const data = await getClasses()
        setClasses(data)
      } catch (error) {
        console.error(error)
      }
    }

    void loadClasses()
  }, [])
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