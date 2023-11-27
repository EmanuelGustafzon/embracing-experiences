import type { Metadata } from 'next'
import './globals.css'
import { getServerSession } from 'next-auth'
import SessionProvider from './auth/SessionProvider'
import { authOptions } from './auth-options/AuthOptions'

export const metadata: Metadata = {
  title: 'EmbracingX',
  description: 'We love travel, outdoor and embracing every moment',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className='font-sans bg-primary text-natrual'>
        <SessionProvider session={ session }>
          {children}
        </SessionProvider>
        
      </body>
    </html>
  )
}
