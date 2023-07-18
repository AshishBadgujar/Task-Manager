import { gql } from "@apollo/client";

export const GET_DATA = gql`
query GetAllTasks{
  tasks {
    id
    title
    description
    completed
  }
}
`
export const CREATE_TASK = gql`
mutation CreateTask($title: String!, $description: String!){
  createTask(title: $title, description: $description){
    id
    title
    description
    completed
  }
}
`
export const GET_TASK = gql`
query GetTask($id:ID!){
  task(id:$id){
    id
    title
    description
    completed
  }
}
`
export const UPDATE_TASK = gql`
mutation UpdateTask($id: ID!, $completed: Boolean!) {
  updateTask(id: $id, completed: $completed) {
    id
    title
    description
    completed
  }
}
`
export const DELETE_TASK = gql`
mutation DeleteTask($id:ID!){
  deleteTask(id:$id)
}
`