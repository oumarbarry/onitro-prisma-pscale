import { useValidatedParams, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const { id } = await useValidatedParams(event, { id: z.string() })

  try {
    const movie = await prisma.movie.findUnique({ where: { id: Number(id) } })

    if (movie)
      return movie
    else
      return createError({ statusCode: 404, statusMessage: 'MOVIE NOT FOUND' })
  }
  catch {
    return createError({ statusCode: 500, statusMessage: 'SOMETHING WENT WRONG' })
  }
})
