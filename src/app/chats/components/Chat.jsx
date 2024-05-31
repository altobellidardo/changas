'use client'

import useChat from '@/hooks/useChat'
import Form from '../components/Form'
import Message from './Message'

export default function ChatComponent ({ history, IdChat, IdUser, UserNumber, OtherUser, OtherUsername }) {
  const [totalComments, bottomRef] = useChat(history, IdChat)

  return (
    <section>
      <div className='my-32 max-w-[1200px] mx-auto'>
        {totalComments.map((item, index) => (
          <Message key={index} item={item} UserNumber={UserNumber} />
        ))}
        <div ref={bottomRef} />
      </div>
      <div>{UserNumber}</div>
      <Form IdChat={IdChat} IdUser={IdUser} history={totalComments} UserNumber={UserNumber} OtherUser={OtherUser} Username2={OtherUsername} />
    </section>
  )
}
