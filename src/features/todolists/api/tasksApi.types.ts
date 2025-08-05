import z from "zod"

export enum TaskStatus {
  New = 0,
  Complete = 2,
}

export type GetTasksResponse = {
  items: DomainTask[]
  totalCount: number
  error: string | null
}

export type UpdateTaskModelType = {
  description: string | null
  startDate: null | string
  deadline: null | string
  title: string
  status: TaskStatus
  priority: number
}

export const domainTaskSchema = z.object({
  deadline: z.string().nullable(),
  startDate: z.string().nullable(),
  description: z.string().nullable(),
  title: z.string(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.number(),
})

export type DomainTask = z.infer<typeof domainTaskSchema>
