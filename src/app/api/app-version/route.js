export function GET () {
  return new Response(JSON.stringify({ version: '1.0.5' }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
