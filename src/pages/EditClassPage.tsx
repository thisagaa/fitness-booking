import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClass } from "../services/classService";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { updateClass } from "../services/classService";

function EditClassPage(){
  const {id} = useParams()
  const [title, setTitle] = useState('')
  const [teacher, setTeacher] = useState('')
  const [capacity, setCapacity] = useState('')
  const [validationError, setValidationError] = useState('')
  const [loadedClassId, setLoadedClassId] = useState<string | undefined>(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadClass() {
      try {
        const data = await getClass(Number(id))
        setTitle(data.title)
        setTeacher(data.teacher)
        setCapacity(String(data.capacity))
        setLoadedClassId(id)
      } catch (error) {
        console.error(error)
      }
    }

    void loadClass()
  }, [id])

  return (
    <main>
      <h1>Edit class</h1>
      <p>Class ID: {id}</p>

      <p>Changes are temporary. Refreshing the page restores the original class list.</p>


      <form
        onSubmit={async (event) => {
          event.preventDefault()
          if(id === undefined || loadedClassId !== id) return

          setValidationError('')

          const capacityNumber = Number(capacity)
          if(!Number.isInteger(capacityNumber) || capacityNumber < 1){
            setValidationError('Enter a whole number of at least 1.')
            return
          }

          if(title.trim() === ''){
            setValidationError('Enter a class title.')
            return
          }

          if(teacher.trim() === ''){
            setValidationError('Enter a teacher name.')
            return
          }
          try {
            const updatedClass = await updateClass(Number(id), {
              title: title.trim(),
              teacher: teacher.trim(),
              capacity: capacityNumber,
            })

            navigate(`/classes/${updatedClass.id}`)
          } catch {
            setValidationError('Unable to save changes. Please try again')
          }
        }}
      >

      <label htmlFor="edit-class-title">Class title</label>
      <input 
        id="edit-class-title"
        value={title}
        onChange={(event) =>
        setTitle(event.target.value)}

      />

      <label htmlFor="edit-class-teacher">Teacher</label>
      <input
        id="edit-class-teacher"
        value={teacher}
        onChange={(event) => setTeacher(event.target.value)}

      />

      <label htmlFor="edit-class-capacity">Capacity</label>
      <input
        id="edit-class-capacity"
        value={capacity}
        type="number"
        onChange={(event) => setCapacity(event.target.value)}

      />

      {validationError && <ErrorMessage message={validationError} />}

      <button type="submit" disabled={loadedClassId !== id}>Save changes</button>

      </form>
    </main>
  )
}

export default EditClassPage