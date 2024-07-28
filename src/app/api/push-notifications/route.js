import messages from '@/utils/messages'
import { NextResponse } from 'next/server'

export async function POST (req) {
  const data = await req.json()

  const fetchedSend = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  let response = await fetchedSend.json()

  // Retry 1 time if too many request were being send at the time
  if (response.errors) {
    if (response.errors.code === 'TOO_MANY_REQUESTS') {
      setTimeout(async () => {
        const fetchedSend = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        response = await fetchedSend.json()
      }, 5000)
    }
  }

  // console.log(response)
  const tickets = response.data
  const ticketIds = []
  for (const i in tickets) {
    if (tickets[i].status === 'ok') {
      ticketIds.push(tickets[i].id)
    }
    if (tickets[i].status === 'error') {
      continue
    }
  }
  // console.log(ticketIds)

  const fetchedReceipts = await fetch('https://exp.host/--/api/v2/push/getReceipts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids: ticketIds })
  })

  const receiptsResponse = await fetchedReceipts.json()
  const receipts = receiptsResponse.data

  for (const i in ticketIds) {
    const ticketId = ticketIds[i]

    if (receipts[ticketId]) {
      if (receipts[ticketId].status === 'ok') {
        continue
      }
      if (receipts[ticketId].status === 'error') {
        setTimeout(async () => {
          await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data[i])
          })
        }, 15000)
      }
    }
  }

  return new NextResponse({ message: messages.success.send_notification }, { status: 200 })
}
