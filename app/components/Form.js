"use client"
import { CREATE_TASK } from '@/utils/query'
import { useMutation } from '@apollo/client'
import React, { useState } from 'react'

export default function Form() {
    const [createTask] = useMutation(CREATE_TASK, {
        refetchQueries: [
            'Tasks'
        ]
    })
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const onSave = async (e) => {
        console.log("saving...")
        e.preventDefault()
        createTask({
            variables: {
                title,
                description
            }
        })
        setTitle('')
        setDescription('')
    }
    return (
        <div>
            <form onSubmit={onSave}>
                <div>
                    <label htmlFor="title" className="block text-white text-opacity-80 mb-2">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" className="w-full bg-transparent bg-opacity-30 border border-gray-300 rounded-xl px-4 py-2 text-white dark:border-neutral-800 placeholder-white placeholder-opacity-50 focus:outline-none focus:border-opacity-70" placeholder="deploy to vercel" />
                </div>
                <div className="mt-4">
                    <label htmlFor="description" className="block text-white text-opacity-80 mb-2">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-transparent h-32 bg-opacity-30 border border-gray-300 rounded-xl px-4 py-2 text-white dark:border-neutral-800 placeholder-white placeholder-opacity-50 focus:outline-none focus:border-opacity-70" placeholder="describe..."></textarea>
                </div>
                <div className="mt-4">
                    <button type="submit" className="hover:bg-opacity-30 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit static w-full  rounded-xl border bg-gray-200 p-3 dark:bg-zinc-800/30">Submit</button>
                </div>
            </form>
        </div>
    )
}
