export interface FitnessClass {
  id: number
  title: string
  teacher: string
  capacity: number
}

export type NewClassInput = Omit<FitnessClass, 'id'>