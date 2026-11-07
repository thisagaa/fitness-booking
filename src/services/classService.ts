import type { FitnessClass } from '../types/FitnessClass'

export async function getClasses(): Promise<FitnessClass[]> {
  const response = await fetch(
    `${import.meta.env.BASE_URL}data/classes.json`
  )

  if (!response.ok) {
    throw new Error('Unable to load classes')
  }

  return response.json()
}

export async function getClass(id: number): Promise<FitnessClass> {
  const classes = await getClasses()
  const fitnessClass = classes.find((item) => item.id === id)

  if(!fitnessClass) {
    throw new Error('Class not found.')

  }

  return fitnessClass
}