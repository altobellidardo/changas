import BackArrowIcon from './icons/BackArrow'
import PenIcon from './icons/PenIcon'
import BinIcon from './icons/BinIcon'

function SwitchMode ({ toggleEditMode, editMode, handleDelete }) {
  return (
    <div>
      <button onClick={toggleEditMode} className='text-brand8 mb-2 bg-brand4 p-2 rounded-full hover:bg-brand5 flex gap-2 items-center w-fit'>
        {editMode ? <BackArrowIcon /> : <PenIcon />}
        {editMode ? 'Cancelar' : 'Editar'}
      </button>
      {editMode &&
        <button onClick={handleDelete} className='text-brand8 mb-2 bg-brand4 p-2 rounded-full hover:bg-brand5 flex gap-2 items-center w-fit'>
          <BinIcon />
          Borrar
        </button>}
    </div>
  )
}

export default SwitchMode
