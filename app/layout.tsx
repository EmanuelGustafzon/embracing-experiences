import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EmbracingX',
  description: 'We love travel, outdoor and embracing every moment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='font-sans'>
        {children}
      </body>
    </html>
  )
}
