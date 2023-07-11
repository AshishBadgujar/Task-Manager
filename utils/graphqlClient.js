import { GraphQLClient } from 'graphql-request';

const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql');

export const graphClient = async (query, variables) => {
    try {
        const data = await graphQLClient.request(query, variables);
        return data
    } catch (error) {
        console.error(error); // Handle any errors
    }
};

