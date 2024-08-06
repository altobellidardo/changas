'use client'
import useChat from '@/hooks/useChatNew'

function Messages ({ data, user1, idChat }) {
  const { chat, bottomRef } = useChat(data, idChat)

  const commonStyle = 'rounded-lg p-2 mx-2 my-[1px] '
  const yourStyle = commonStyle + ' self-end bg-brand3 text-brand8'
  const otherStyle = commonStyle + ' self-start border'

  return (
    <ul className='my-32 max-w-[1200px] mx-auto'>
      {chat.map((msg) => {
        const fromYou = msg.user_1 === user1
        return (
          <li
            key={msg.time}
            className='flex flex-col items-center w-full'
          >
            <div className={fromYou ? yourStyle : otherStyle}>
              {msg.content}
            </div>
          </li>
        )
      })}

      <div ref={bottomRef} />
    </ul>
  )
}

export default Messages
