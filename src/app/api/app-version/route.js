export function GET () {
  return new Response(JSON.stringify({ version: '1.0.4' }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
