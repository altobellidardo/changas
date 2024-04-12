import Logo from '@/components/icons/logo'
import Link from 'next/link'
import UploadCritique from './form'

async function UploadReview ({ searchParams }) {
  const ReviewerId = searchParams.ReviewerId
  const ReviewedId = searchParams.ReviewedId
  const ContractId = searchParams.ContractId
  const Category = searchParams.Category

  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <div className='w-full px-6 py-2.5 bg-brand5 flex justify-between items-center'>
        <Link href='/' className='size-9'>
          <Logo />
        </Link>
      </div>
      <UploadCritique ReviewerId={ReviewerId} ReviewedId={ReviewedId} ContractId={ContractId} Category={Category} />
    </main>
  )
}

export default UploadReview
