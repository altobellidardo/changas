import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

export default supabase
