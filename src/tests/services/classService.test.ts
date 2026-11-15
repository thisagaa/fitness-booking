import { it, vi, afterEach,expect } from 'vitest'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.resetModules()
})

it('loads class records from JSON', async () => {
  const records = [
    {id: 4, title: 'Karate', teacher: 'Yoong', capacity: 15}
  ]

  vi.stubGlobal(
    'fetch', 

    vi.fn().mockResolvedValue(Response.json(records)),
  )

  const { getClasses } = await
  import('../../services/classService')
  const result = await getClasses()

  expect(result).toEqual(records)
})

it('rejects when the class request fails',
  async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, {status: 500}))
    )

    const {getClasses} = await
    import('../../services/classService')

    await
    expect(getClasses()).rejects.toThrow('Unable to load classes')
  }
)

it('creates a class that can be retrieved by its new ID', async () => {
  const records = [
    {id: 4, title: 'Karate', teacher: 'Yoong', capacity: 15},
  ]

  vi.stubGlobal(
    'fetch',

    vi.fn().mockResolvedValue(Response.json(records)),
  )

  const {createClass, getClass} = await
  import('../../services/classService')

  const created = await createClass({
    title: 'Pilates',
    teacher: 'Jude',
    capacity: 15
  })

  expect(created.id).toBe(5)

  const saved = await getClass(created.id)
  expect(saved).toEqual(created)

})