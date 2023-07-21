import { createYoga, createSchema } from 'graphql-yoga'
import { readData, writeData } from '../../../utils/db';
import { nanoid } from 'nanoid';

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
          console.log("fetching tasks...")
          return data.tasks
        } catch (error) {
          throw new Error(error.message);
        }
      },
      task: async (_, { id }) => {
        try {
          let data = await readData()
          return data.tasks.find(i => i.id == id)
        } catch (error) {
          throw new Error(error.message);
        }
      }
    },
    Mutation: {
      createTask: async (_, { title, description }) => {
        try {
          const task = {
            id: nanoid(),
            title,
            description,
            completed: false
          };
          let data = await readData()
          data.tasks.push(task)
          await writeData(data)
          return task;
        } catch (error) {
          throw new Error(error.message);
        }
      },
      updateTask: async (_, { id, completed }) => {
        try {
          const data = await readData()
          let task = data.tasks.find(i => i.id == id)
          if (!task) {
            throw new Error('Task not found');
          }
          task.completed = completed;
          await writeData(data)
          return task;
        } catch (error) {
          throw new Error(error.message);
        }
      },
      deleteTask: async (_, { id }) => {
        const data = await readData()
        data.tasks = data.tasks.filter(i => i.id != id)
        await writeData(data)
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

//with APOLLO SERVER---------------------------------------------------------------

// import { startServerAndCreateNextHandler } from "@as-integrations/next";

// import { ApolloServer } from "@apollo/server";

// import { gql } from "graphql-tag";

// import { NextRequest } from "next/server";

// const typeDefs = gql`
// type Task {
//   id: ID!
//   title: String!
//   description: String!
//   completed: Boolean!
// }

// type Query {
//   tasks: [Task]!
//   task(id:ID!):Task!
// }

// type Mutation {
//   createTask(title: String!, description: String!): Task!
//   updateTask(id: ID!, completed: Boolean!): Task!
//   deleteTask(id: ID!): Boolean!
// }

//   `;



// const server = new ApolloServer({

//   resolvers,

//   typeDefs,

// });

// const handler = startServerAndCreateNextHandler(server);

// export async function GET(request) {

//   return handler(request);

// }

// const resolvers= {
//   Query: {
//     tasks: async () => {
//       try {
//         let data = await readData()
//         return data.tasks
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },
//     task: async (_, { id }) => {
//       try {
//         let data = await readData()
//         return data.tasks.find(i => i.id == id)
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     }
//   },
//   Mutation: {
//     createTask: async (_, { title, description }) => {
//       try {
//         const task = {
//           id: nanoid(),
//           title,
//           description,
//           completed: false
//         };
//         let data = await readData()
//         data.tasks.push(task)
//         await writeData(data)
//         return task;
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },
//     updateTask: async (_, { id, completed }) => {
//       try {
//         const data = await readData()
//         let task = data.tasks.find(i => i.id == id)
//         if (!task) {
//           throw new Error('Task not found');
//         }
//         task.completed = completed;
//         await writeData(data)
//         return task;
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },
//     deleteTask: async (_, { id }) => {
//       const data = await readData()
//       data.tasks = data.tasks.filter(i => i.id != id)
//       await writeData(data)
//       return true;
//     },
//   }
// }

// export async function POST(request) {

//   return handler(request);

// }
