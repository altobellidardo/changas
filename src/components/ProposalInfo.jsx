import formatDate from '@/utils/formateDate'

function ProposalInfo ({ proposal }) {
  return (
    <>
      <div>
        <span className='opacity-60 text-sm'>Categoría</span>
        <p>{proposal.category}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Presupuesto</span>
        <p>${proposal.budget}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Ubicación</span>
        <p>{proposal.location}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Fecha de publicación</span>
        <p>{formatDate(proposal.open_date.slice(0, 10))}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Descripción</span>
        <p>{proposal.description}</p>
      </div>
    </>
  )
}

export default ProposalInfo
