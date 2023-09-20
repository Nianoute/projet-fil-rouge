import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const uploadFileSupabase = async (oneFile, fileFolder: string) => {
    console.log(oneFile, fileFolder)
    const file = oneFile[0]
    file.originalname = file.originalname.replaceAll(/ /g, '%20')
    const filePath = `public/${Date.now()}-${file.originalname}`
    let uploadedFile = await supabase.storage.from(fileFolder).upload(filePath, file.buffer)
    return uploadedFile
}