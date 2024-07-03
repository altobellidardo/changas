import Footer from '@/components/footer'
import Header from '@/components/header/header'
import content from './content'

function Element (element) {
  switch (element.tag) {
    case 'p':
      return <p key={element.text} className='mb-2'>{element.text}</p>
    case 'ul':
      return (
        <ul key={Math.random().toString()}>
          {element.content.map(element => (
            <li key={element.text.toString()} className='list-disc ml-10'>
              {element.text}
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol key={Math.random().toString()}>
          {element.content.map(element => (
            <li key={element.text.toString()} className='ml-10'>
              {element.text}
            </li>
          ))}
        </ol>
      )
    default:
      return null
  }
}

function Section (section) {
  const contenido = section.content
  return (
    <section>
      <h2 className='text-xl font-bold mb-4'>{section.title}</h2>
      {contenido.map(element => Element(element))}
    </section>
  )
}

function Legal () {
  const sections = content.data
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <Header />
      <main className='mx-auto max-w-[80vw] my-10'>
        <h1 className='text-3xl font-bold'>
          Política de privacidad de la plataforma Changas
        </h1>
        {sections.map(section => Section(section))}
      </main>
      <Footer />
    </div>
  )
}

export default Legal
