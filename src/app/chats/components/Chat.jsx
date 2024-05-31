'use client'

import useChat from '@/hooks/useChat'
import Form from '../components/Form'
import Message from './Message'

export default function ChatComponent ({ history, IdChat, IdUser, UserNumber, OtherUser, OtherUsername }) {
  const [totalComments, bottomRef] = useChat(history, IdChat)
  console.log(OtherUsername)
  return (
    <section>
      <div className='my-32 max-w-[1200px] mx-auto'>
        {totalComments.map((item) => (
          <Message key={Math.random()} item={item} IdUser={IdUser} />
        ))}
        <div ref={bottomRef} />
      </div>

      <Form IdChat={IdChat} IdUser={IdUser} history={totalComments} UserNumber={UserNumber} OtherUser={OtherUser} OtherUsername={OtherUsername} />
    </section>
  )
}
