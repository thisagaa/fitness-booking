import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import type { FitnessClass } from "../types/FitnessClass";
import { getClass, isClassBooked, bookClass, cancelBooking } from "../services/classService";
import ClassCard from "../components/ClassCard";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";
import { Link } from "react-router-dom";
import { deleteClass } from "../services/classService";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function ClassDetailPage() {
  const { id } = useParams()
  const [fitnessClass, setFitnessClass] = useState<FitnessClass | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const [isBooked, setIsBooked] = useState(false)

  useEffect(() => {
    let ignore = false  //prevents an old request from updating the page
    setFitnessClass(null)
    setError(null) //keeps an error from one class from carrying over when you open another

    async function loadClass() {
      try {
        const data = await getClass(Number(id))
        if(!ignore) {
          setFitnessClass(data)
          setIsBooked(isClassBooked(data.id))
        }
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
        <p className="m-2">
          Spots available: {Math.max(0, fitnessClass.capacity - (isBooked ? 1 : 0))}
        </p>
      )}
        {fitnessClass && token && !isBooked && (
          <button 
            type="button"
            className="btn btn-primary"
            disabled={fitnessClass.capacity < 1}
            onClick={async () => {
              setError(null)

              try {
                await bookClass(fitnessClass.id)
                setIsBooked(true)
              } catch (error) {
                setError(error instanceof Error ? error.message : 'Unable to book this class.')

              }
            }}
            >
              {fitnessClass.capacity < 1 ? 'Class full' : 'Book a spot'}
            </button>
        )}
        {fitnessClass && token && isBooked && (
          <button 
            type="button"
            className="btn btn-outline-light"
            onClick={async ()=> {
              setError(null)

              try {
                await cancelBooking(fitnessClass.id)
                setIsBooked(false)
              } catch {
                setError('Unable to cancel this booking. Please try again.')
              }
            }}
            >
              Cancel booking
            </button>
        )}
        {token && (
          <p className="small text-body-secondary mt-2">
            Bookings reset when you refresh the page.
          </p>
        )}
        
        
      
      <div className="class-detail-actions">
      {fitnessClass && (
        <Link to={`/classes/${fitnessClass.id}/edit`}>Edit class</Link>
      )}

      {fitnessClass && token && (
        <button
          type="button"
          onClick={async () =>{
            const confirmed = window.confirm(`Are you sure you want to delete ${fitnessClass.title}`)
            if(!confirmed) return

            try {
              await deleteClass(fitnessClass.id)
              navigate('/classes')
            } catch{
              setError('Unable to delete this class. Please try again.')
            }
          }}
          >
            Delete class
          </button>
      )}
      </div>
    </main>
  )
}

export default ClassDetailPage