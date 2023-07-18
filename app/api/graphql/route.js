import { createYoga, createSchema } from 'graphql-yoga'
import { readData } from '../../../utils/db';

const schema = createSchema({
  typeDefs: `
  type Task {
    id: ID!
    title: String!
    description: String!
    completed: Boolean!
  }

  type Query {
    tasks: [Task]!
    task(id:ID!):Task!
  }

  type Mutation {
    createTask(title: String!, description: String!): Task!
    updateTask(id: ID!, completed: Boolean!): Task!
    deleteTask(id: ID!): Boolean!
  }
  `,
  resolvers: {
    Query: {
      tasks: async () => {
        try {
          let data = await readData()
          return data.tasks
        } catch (error) {
          throw new Error(error.message);
        }
      },
      task: (_, { id }) => { }
    },
    Mutation: {
      createTask: (_, { id, title, description }) => {
        // const task = ;
        return {};
      },
      updateTask: async (_, { id, completed }) => {
        const task = {};
        if (!task) {
          throw new Error('Task not found');
        }
        task.completed = completed;
        // await task.save();
        return {};
      },
      deleteTask: async (_, { id }) => {
        const task = {}
        if (!task) {
          throw new Error('Task not found');
        }
        return true;
      },
    }
  }
})
const { handleRequest } = createYoga({
  graphqlEndpoint: '/api/graphql',
  schema,
  fetchAPI: { Request: Request, Response: Response }
})

export { handleRequest as GET, handleRequest as POST }
