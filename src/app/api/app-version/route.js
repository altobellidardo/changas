export function GET () {
  return new Response(JSON.stringify({ version: '1.0.9' }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
