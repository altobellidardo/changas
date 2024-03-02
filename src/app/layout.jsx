import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: 'Changas - conecta con empleados y servicios',
  description: 'La plataforma para conectar empleados y servicios con vos.',
  icons: {
    icon: '/logo.svg'
  },
  keywords: ['changas', 'contratar', 'servicio', 'proyectos', 'electricistas']
}

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
