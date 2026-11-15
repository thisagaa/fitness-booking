import ClassCard from "../../components/ClassCard"
import { afterEach, it } from 'vitest'
import {cleanup, render, screen } from '@testing-library/react'

it('displays the class title as a heading',
  () => {
    render(
      <ClassCard 
        fitnessClass={{id: 4, title: 'Karate', teacher: 'Yoong', capacity: 15}}
        />
    )
    screen.getByRole('heading', { name: 'Karate'})
  }
)

afterEach(cleanup)

it('displays the class teacher', () => {
  render(
      <ClassCard 
        fitnessClass={{id: 4, title: 'Karate', teacher: 'Yoong', capacity: 15}}
        />
    )
  screen.getByText('Teacher: Yoong')
})

it('displays the class capacity', () => {
  render(
    <ClassCard 
        fitnessClass={{id: 4, title: 'Karate', teacher: 'Yoong', capacity: 15}}
        />
  )
  screen.getByText('Capacity: 15 people')
})
