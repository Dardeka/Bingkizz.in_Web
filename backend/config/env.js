import { config } from 'dotenv'

config({ path: '.env' })

export const { 
    MIDTRANS_SERVER_KEY, MIDTRANS_CLIENT_KEY
} = process.env;