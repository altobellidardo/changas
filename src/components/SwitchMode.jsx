import BackArrowIcon from './icons/BackArrow'
import PenIcon from './icons/PenIcon'

function SwitchMode ({ toggleEditMode, editMode }) {
  return (
    <button onClick={toggleEditMode} className='text-brand8 mb-2 bg-brand4 p-2 rounded-full hover:bg-brand5 flex gap-2 items-center w-fit'>
      {editMode ? <BackArrowIcon /> : <PenIcon />}
      {editMode ? 'Cancelar' : 'Editar'}
    </button>
  )
}

export default SwitchMode
