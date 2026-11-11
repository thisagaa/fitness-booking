import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import type { FitnessClass } from "../types/FitnessClass";
import { getClass } from "../services/classService";
import ClassCard from "../components/ClassCard";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";
import { Link } from "react-router-dom";

function ClassDetailPage() {
  const { id } = useParams()
  const [fitnessClass, setFitnessClass] = useState<FitnessClass | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false  //prevents an old request from updating the page
    setFitnessClass(null)
    setError(null) //keeps an error from one class from carrying over when you open another

    async function loadClass() {
      try {
        const data = await getClass(Number(id))
        if(!ignore) setFitnessClass(data)
      } catch (error) {
        if(!ignore) {
          console.error(error)
          setError('Unable to load this class')
        } 
      }
    }

    void loadClass()

    return () => {
      ignore = true
    }
  }, [id])

  return (
    <main>
      <h1>Class details</h1>
      <p>Class ID: {id}</p>
      {!fitnessClass && !error && (
        <LoadingMessage message="Loading class details..." />
      )}
      {error && <ErrorMessage message={error} />}
      {fitnessClass && <ClassCard fitnessClass={fitnessClass} />}
      {fitnessClass && (
        <Link to={`/classes/${fitnessClass.id}/edit`}>Edit class</Link>
      )}
    </main>
  )
}

export default ClassDetailPage