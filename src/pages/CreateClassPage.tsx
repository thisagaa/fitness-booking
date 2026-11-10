import { useState } from "react";
import ErrorMessage from '../components/ErrorMessage'
import { useNavigate } from "react-router-dom";
import { createClass } from "../services/classService";


function CreateClassPage() {
  const [title, setTitle] = useState('')
  const [teacher, setTeacher] = useState('')
  const [capacity, setCapacity] = useState('')
  const [titleError, setTitleError] = useState('')
  const [teacherError, setTeacherError] = useState('')
  const [capacityError, setCapacityError] = useState('');
  const [saveError, setSaveError] = useState('')
  const navigate = useNavigate()

  return (
    <main>
      <h1>Create a class</h1>

      <form
        onSubmit={ async (event) => {
          event.preventDefault()
          setSaveError('')
          if(title.trim() === ''){
            setTitleError('Enter a class title.')
            return
          }

          setTitleError('')

          if(teacher.trim() === ''){
            setTeacherError('Enter a teacher name')
            return
          }

          setTeacherError('')

          const capacityNumber = Number(capacity)

          if(!Number.isInteger(capacityNumber) || capacityNumber < 1) {
            setCapacityError('Enter a whole number of at least 1.')
            return
          }

          setCapacityError('')

          try {
            const newClass = await createClass({
              title: title.trim(),
              teacher: teacher.trim(),
              capacity: capacityNumber,
            })

            navigate(`/classes/${newClass.id}`)
          } catch {
            setSaveError('Unable to create the class. Please try again.')
          }
        }}
      >
        <label htmlFor="class-title">Class title</label>
        <input
          id="class-title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)} 
        />
        {titleError && <ErrorMessage message = {titleError} />}

        <label htmlFor="class-teacher">Class teacher</label>
        <input 
          id="class-teacher"
          value={teacher}
          onChange={(event) => 
            setTeacher(event.target.value)}
        />   
        {teacherError && <ErrorMessage message = {teacherError} />} 

        <label htmlFor="class-capacity">Capacity</label>
        <input 
          id="class-capacity"
          type="number"
          value={capacity}
          onChange={(event) =>
            setCapacity(event.target.value)}

        />

        {capacityError && <ErrorMessage message= {capacityError} />}
        {saveError && <ErrorMessage message= {saveError} />}
        <button type="submit">Create class</button>
      </form>
    </main>
  )
}

export default CreateClassPage