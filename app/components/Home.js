"use client"
import { GET_DATA } from '@/utils/query'
import Card from './Card'
import Form from './Form'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

export const dynamic = "force-dynamic";

export default function Home() {
    const { data } = useSuspenseQuery(GET_DATA);
    console.log("data=", data)

    return (
        <>
            <div className='mt-16 w-full md:w-40rem'>
                <Form />
            </div>
            <div className="my-16 grid lg:mb-0 lg:grid-cols-3 lg:text-left">
                {data?.tasks?.map(item => <Card key={item.id} task={item} />)}
            </div>
        </>
    )
}

