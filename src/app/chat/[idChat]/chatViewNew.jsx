import { getFullChat, sendMessage } from '@/actions/chat'

const yourStyle = 'bg-brand6 text-brand8'
const otherStyle = 'bg-brand3 text-brand8'

async function ChatViewNew ({ idChat, user1 }) {
  const data = await getFullChat(idChat)

  return (
    <section>
      <ul>
        {data.map((msg) => {
          const fromYou = msg.user_1 === user1

          return (
            <li
              key={msg.time}
              className={fromYou ? yourStyle : otherStyle}
            >
              {msg.content} from {msg.user_1 ? 'you' : 'other'}
            </li>
          )
        })}
      </ul>

      <form action={sendMessage}>
        <input type='text' name='msg' />
        <input type='hidden' name='data' value={JSON.stringify({ idChat, user1 })} />
        <button type='submit'>Send</button>
      </form>
    </section>
  )
}

export default ChatViewNew
