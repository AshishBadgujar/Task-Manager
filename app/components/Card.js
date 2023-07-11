"use client"

import { graphClient } from "@/utils/graphqlClient"
import { DELETE_TASK, UPDATE_TASK } from "@/utils/query"
import { useState } from "react"

export default function Card({ task }) {
    const onComplete = async () => {
        const [{ data }] = await Promise.all([graphClient(UPDATE_TASK, { id: task.id, completed: !task.completed })])
    }
    const onDelete = async () => {
        const [{ data }] = await Promise.all([graphClient(DELETE_TASK, { id: task.id })])
        console.log(data)
    }
    return (
        <div
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
            <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-10 cursor-pointer">
                    <span onDoubleClick={onComplete} className={task.completed ? "mb-3 text-2xl font-semibold line-through" : 'mb-3 text-2xl font-semibold'}>
                        {task.title}
                    </span>
                    <p onDoubleClick={onComplete} className={task.completed ? "m-0 max-w-[30ch] text-sm opacity-50 line-through" : 'm-0 max-w-[30ch] text-sm opacity-50'}>
                        {task.description}
                    </p>
                </div>
                <div className="col-span-2">
                    <button onClick={onDelete} className="relative flex items-center justify-center p-2 rounded-md bg-opacity-20 backdrop-filter backdrop-blur-md bg-gray-100 text-red-500 hover:bg-red-500 hover:bg-opacity-20 transition-colors duration-300">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
