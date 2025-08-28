import '../styles/globals.css'
import { appTitle, appDescr } from './consts';
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

export const metadata = {
  title: appTitle,
  description: appDescr,
  icons: {
    icon: 'favicon.ico'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
