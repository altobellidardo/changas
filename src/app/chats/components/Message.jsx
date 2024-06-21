function Message ({ item, UserNumber }) {
  return (
    <div className='flex flex-col items-center w-full'>
      <div className={`rounded-lg p-4 mx-2 my-1 ${item.user_num !== parseInt(UserNumber) ? 'self-end border ' : 'self-start bg-brand3 text-brand8'}`}>
        {item.message}
      </div>
    </div>
  )
}

export default Message
