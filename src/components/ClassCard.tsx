interface ClassCardProps{
  title: string
  teacher: string
  capacity: number
}

function ClassCard({ title, teacher, capacity }: ClassCardProps) {

  return (
    <article>
      <h2>{title}</h2>
      <p>Teacher: {teacher}</p>
      <p>Capacity: {capacity} people</p>
    </article>
  )
}

export default ClassCard