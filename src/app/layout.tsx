import type { Metadata } from 'next'
import './globals.css'

//const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'How BLAST Works',
  description: 'Interactive website for exploring methods for pairwise sequence alignment.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*<body className={inter.className}>{children}</body>*/}
      <body>{children}</body>
    </html>
  )
}
