import Footer from '@/components/footer'
import Header from '@/components/header/header'
import content from './content'

function Section (section) {
  return (
    <section className='my-10'>
      <h2 className='text-2xl font-bold'>{section.title}</h2>
      {section.content.map(paragraph => (
        <p key={paragraph.slice(0, 10)}>{paragraph}</p>
      ))}
    </section>
  )
}

function Legal () {
  const { title, sections } = content.termsAndConditions
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <Header />
      <main className='mx-auto max-w-[80vw] my-10'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        {sections.map(section => Section(section))}
      </main>
      <Footer />
    </div>
  )
}

export default Legal
