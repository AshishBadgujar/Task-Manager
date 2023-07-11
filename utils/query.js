export const GET_DATA = `
query GetAllTasks{
  tasks {
    id
    title
    description
    completed
  }
}
`
export const CREATE_TASK = `
mutation CreateTask($title: String!, $description: String!){
  createTask(title: $title, description: $description){
    id
    title
    description
    completed
  }
}
`
export const GET_TASK = `
query GetTask($id:ID!){
  task(id:$id){
    id
    title
    description
    completed
    updatedAt
  }
}
`
export const UPDATE_TASK = `
mutation UpdateTask($id: ID!, $completed: Boolean!) {
  updateTask(id: $id, completed: $completed) {
    id
    title
    description
    completed
  }
}
`
export const DELETE_TASK = `
mutation DeleteTask($id:ID!){
  deleteTask(id:$id)
}
`