'use client'

import useChat from '@/hooks/useChat'
import Form from '../components/Form'

export default function ChatComponent ({ history, IdChat, IdUser, UserNumber, OtherUser }) {
  const [totalComments, bottomRef] = useChat(history, IdChat)

  return (
    <div>
      <div className='my-32 max-w-[1200px] mx-auto'>
        {totalComments.map((item) => (
          <div key={Math.random()}>
            <div className='flex flex-col items-center w-full'>
              <div className={`rounded-lg p-4 mx-2 my-1 ${item.id_user === IdUser ? 'self-end border ' : 'self-start bg-brand3 text-brand8'}`}>
                {item.message}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <Form IdChat={IdChat} IdUser={IdUser} history={totalComments} UserNumber={UserNumber} OtherUser={OtherUser} />
    </div>
  )
}
