import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const uploadFileSupabase = async (oneFile, fileFolder: string) => {
    const filePath = `public/${Date.now()}-${oneFile[0].originalname}`
    let uploadedFile = await supabase.storage.from(fileFolder).upload(filePath, oneFile.buffer)
    return uploadedFile
}