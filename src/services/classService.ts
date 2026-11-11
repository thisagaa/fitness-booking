import type { FitnessClass, NewClassInput } from '../types/FitnessClass'

let classes: FitnessClass[] | null = null //one shared list. Every call to getClasses() fetches a fresh copy of the JSON. A class added to one copy would dissapear when another page fetched the file again

export async function getClasses(): Promise<FitnessClass[]> {
  if (classes !== null) {
    return classes
  }
  
  const response = await fetch(
    `${import.meta.env.BASE_URL}data/classes.json`
  )

  if (!response.ok) {
    throw new Error('Unable to load classes')
  }

  const data: FitnessClass[] = await response.json()
  classes ??= data
  return classes
}

export async function getClass(id: number): Promise<FitnessClass> {
  const classes = await getClasses()
  const fitnessClass = classes.find((item) => item.id === id)

  if(!fitnessClass) {
    throw new Error('Class not found.')

  }

  return fitnessClass
}

export async function createClass(input: NewClassInput): Promise<FitnessClass> {
  const list = await getClasses()
  const highestId = list.reduce((highest, item)=> Math.max(highest, item.id), 0)
  const newClass: FitnessClass = {...input, id: highestId + 1}

  list.push(newClass)
  return newClass
}

export async function updateClass(
  id:number,
  input: NewClassInput,
): Promise<FitnessClass> {
  const list = await getClasses()
  const index = list.findIndex((item)=> item.id === id)

  if (index === -1) {
    throw new Error('Class not found.')
  }

  const updatedClass: FitnessClass = {...input, id}
  list[index] = updatedClass
  return updatedClass
}

export async function deleteClass(id: number): Promise<void> {
  const list = await getClasses()
  const index = list.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new Error('Class not found')
  }

  list.splice(index, 1)
}
