import ClassCard from "../components/ClassCard"
import type { FitnessClass } from '../types/FitnessClass'
import { useEffect, useState } from 'react'
import { getClasses } from "../services/classService"
import LoadingMessage from "../components/LoadingMessage"
import ErrorMessage from "../components/ErrorMessage"

function ClassListPage() {
  const [classes, setClasses] = useState<FitnessClass[]>([])
  const [search, setSearch] = useState('') //search holds the current search text, set search updates it, '' starts it empty
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadClasses() {
      try {
        const data = await getClasses()
        setClasses(data)
      } catch (error) {
        console.error(error)
        setError('Unable to load classes. Please refresh and try again.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadClasses()
  }, [])
  const filteredClasses = classes.filter((fitnessClass) =>
    fitnessClass.title.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return (
      <main>
        <h1>Fitness Class Booking</h1>
        <LoadingMessage message="Loading classes..." />
      </main>
    )
  }

  if(error) {
    return(
      <main>
        <h1>Fitness Class Booking</h1>
        <ErrorMessage message={error}/>
      </main>
    )
  }

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
      {classes.length === 0 && (
        <p>No classes are available yet.</p>
      )}
      {classes.length > 0 && filteredClasses.length === 0 && (
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

export default ClassListPage