import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const uploadFileSupabase = async (file, folderName: string) => {
    const filePath = `public/${Date.now()}-${file.originalname}`
    let uploadedFile = await supabase.storage.from(folderName).upload(filePath, file.buffer)
    return uploadedFile
}