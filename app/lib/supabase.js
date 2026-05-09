import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ieugedersatdyitbktby.supabase.co'
const supabaseKey = 'sb_publishable_e-R7O9Tksg6_YQCoTdxInQ_p6VqvBG_'

export const supabase = createClient(supabaseUrl, supabaseKey)
