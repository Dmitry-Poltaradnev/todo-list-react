import z from "zod"

export const todoListTypeSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.number(),
})

export type TodoListType = z.infer<typeof todoListTypeSchema>
