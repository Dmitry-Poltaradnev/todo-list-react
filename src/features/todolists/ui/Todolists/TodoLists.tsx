import React from "react"
import { Todolist } from "./Todolist/TodoList"
import { SkeletonTodoList } from "./Todolist/SkeletonTodolist/SkeletonTodoList"
import { useAppSelector } from "../../../../common/hooks/useAppSelector"
import { selectTodoLists } from "../../model/todoList-slice"
import { selectAppStatus } from "../../model/app-slice"

export const TodoLists = () => {
  const todoLists = useAppSelector(selectTodoLists)

  const appStatus = useAppSelector(selectAppStatus)

  const skeletonCount = todoLists.length > 0 ? todoLists.length : 3

  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
      {appStatus === "loading" ? (
        <li
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          {" "}
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonTodoList key={i} />
          ))}
        </li>
      ) : (
        todoLists.map((todoList) => <Todolist key={todoList.id} todoList={todoList} />)
      )}
    </div>
  )
}
