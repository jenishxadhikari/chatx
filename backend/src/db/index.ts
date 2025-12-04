import mongoose from 'mongoose'

import { env } from '@/config/env'

export async function connectDB() {
  try {
    const conn = await mongoose.connect(env.DATABASE_URL)
    console.log(`Connected to the database successfully: ${conn.connection.host}`)
  } catch (error) {
    console.log('MongoDB connection error:', error)
  }
}
