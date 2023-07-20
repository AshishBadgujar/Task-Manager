import { GET_DATA } from '@/utils/query'
import Card from './components/Card'
import Form from './components/Form'
import { getClient } from '@/utils/graphqlClient'
import { readData } from '../utils/db'
import { gql } from '@apollo/client'

const query = gql`
query Tasks {
  tasks {
    id
    title
    description
    completed
  }
}
`
export default async function Home() {
  const { data } = await getClient().query({ query: query });
  console.log("data=", data)

  return (
    <>
      <div className='mt-16 w-full md:w-40rem '>
        <Form />
      </div>
      <div className="my-16 grid lg:mb-0 lg:grid-cols-3 lg:text-left">
        {/* {data?.tasks?.map(item => <Card key={item.id} task={item} />)} */}
      </div>
    </>
  )
}

