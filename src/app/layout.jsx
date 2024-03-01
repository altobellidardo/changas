import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Changas - conecta con empleados y servicios',
  description: 'La plataforma para conectar empleados y servicios con vos.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='shortcut icon' href='/logo.svg' type='image/x-icon' />
      </head>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
