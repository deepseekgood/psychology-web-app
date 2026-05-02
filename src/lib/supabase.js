import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qxtwkcfdqobjtmlmvpsa.supabase.co'
const supabaseKey = 'sb_publishable_Ayin8EwxOKPMdUdGg5QApg_4Naei-24'

export const supabase = createClient(supabaseUrl, supabaseKey)
