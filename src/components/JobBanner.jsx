/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

function JobBanner ({ info, link }) {
  const { id, name, description } = info

  return (
    <div className='p-4 border-2 rounded-xl border-brand6 bg-brand6/10 flex flex-col gap-4 lg:flex-row lg:justify-between'>
      <div>
        {link
          ? <Link href={link} className='text-xl font-bold hover:underline'>{name}</Link>
          : <h2 className='text-xl font-semibold'>{name}</h2>}
        <p>{description}</p>
      </div>
      <img src={`/IconCategories/${id}.svg`} alt={name} className='size-36 mx-auto lg:mx-0' />
    </div>
  )
}
export default JobBanner
