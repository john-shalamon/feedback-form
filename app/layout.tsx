import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Created with John Shalamon',
  generator: 'John Shalamon',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
