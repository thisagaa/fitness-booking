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