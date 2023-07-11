import { createYoga, createSchema } from 'graphql-yoga'
import connectDB from '../../../utils/db';
import Task from '../../../models/Task';

connectDB();

const schema = createSchema({
  typeDefs: `
  type Task {
    id: ID!
    title: String!
    description: String!
    completed: Boolean!
    updatedAt: String!
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
      tasks: () => Task.find(),
      task: (_, { id }) => Task.findById(id)
    },
    Mutation: {
      createTask: (_, { title, description }) => {
        const task = new Task({ title, description });
        return task.save();
      },
      updateTask: async (_, { id, completed }) => {
        const task = await Task.findById(id);
        if (!task) {
          throw new Error('Task not found');
        }
        task.completed = completed;
        await task.save();
        return task;
      },
      deleteTask: async (_, { id }) => {
        const task = await Task.findByIdAndDelete(id);
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
