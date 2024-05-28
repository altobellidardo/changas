/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

function JobBanner ({ info, link }) {
  const { id, name } = info

  if (link) {
    return (
      <Link
        href={link}
        className='p-4 rounded-xl bg-brand6/10 hover:bg-brand6/40 flex gap-4 flex-col justify-between'
      >
        <h2 className='text-xl font-semibold'>{name}</h2>
        <img src={`/IconCategories/${id}.svg`} alt={name} className='size-36 mx-auto' />
      </Link>
    )
  } else {
    return (
      <div className='p-4 rounded-xl bg-brand6/10 flex gap-4 flex-col justify-between'>
        <div>
          <h2 className='text-xl font-semibold'>{name}</h2>
        </div>
        <img src={`/IconCategories/${id}.svg`} alt={name} className='size-36 mx-auto' />
      </div>
    )
  }
}

export default JobBanner
