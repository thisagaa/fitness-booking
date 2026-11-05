import type { FitnessClass } from "../types/FitnessClass"

interface ClassCardProps{
  fitnessClass: FitnessClass
}

function ClassCard({ fitnessClass }: ClassCardProps) {

  return (
    <article>
      <h2>{fitnessClass.title}</h2>
      <p>Teacher: {fitnessClass.teacher}</p>
      <p>Capacity: {fitnessClass.capacity} people</p>
    </article>
  )
}

export default ClassCard