import { poppins } from '@/utils/font'
import './globals.css'

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
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
