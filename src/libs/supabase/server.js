import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjb2pyYWpzbWpobXludnR1cWt5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTE0MDcwNiwiZXhwIjoyMDI2NzE2NzA2fQ.asmu2yye0hRQ9EGIlLb7boJhTrfoheoPKYZ8lqMutk4'
)

export default supabase
