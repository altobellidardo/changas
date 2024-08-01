import BackArrowIcon from './icons/BackArrow'
import PenIcon from './icons/PenIcon'
import BinIcon from './icons/BinIcon'

function SwitchMode ({ toggleEditMode, editMode, handleDelete }) {
  return (
    <div className='flex justify-between'>
      <button onClick={toggleEditMode} className='text-brand8 mb-2 bg-brand4 p-2 rounded-full hover:bg-brand5 flex gap-2 items-center border-2'>
        {editMode ? <BackArrowIcon /> : <PenIcon />}
        {editMode ? 'Cancelar' : 'Editar'}
      </button>
      {editMode &&
        <button onClick={handleDelete} className='text-red-600 mb-2 bg-red-200 border-2 border-red-600 p-2 rounded-full hover:bg-red-300 flex gap-2 items-center'>
          <BinIcon />
          Borrar
        </button>}
    </div>
  )
}

export default SwitchMode
