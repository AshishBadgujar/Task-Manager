import Image from 'next/image'
import Link from 'next/link'
import './globals.css'
import { ApolloWrapper } from '@/utils/apollo-provider'

export const metadata = {
  title: 'Task Manager',
  description: 'Made with Next.js 13',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="manifest"
          href="/manifest.json"
        />
      </head>
      <body >
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
