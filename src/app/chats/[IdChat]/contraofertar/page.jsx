import ContractForm from '../../components/ContractForm'

function CounterOfferPage ({ searchParams }) {
  const ContractId = searchParams.ContractId
  return (
    <ContractForm ContractId={ContractId} />
  )
}

export default CounterOfferPage
