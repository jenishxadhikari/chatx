import { env } from '@/config/env'
import { connectDB } from '@/db'
import { server } from '@/lib/socket'

(async function () {
  try {
    connectDB()

    server.listen(env.PORT, () => {
      console.log(`Server running at port: ${env.PORT}`)
    })
  } catch (error) {
    console.log('Failed to start server', error)

    if (env.NODE_ENV === 'production') {
      process.exit(1)
    }
  }
})()

const serverTermination = async (signal: NodeJS.Signals) => {
  try {
    console.log('Server Shutdown', signal)

    process.exit(0)
  } catch (error) {
    console.log('Error during server shutdown', error)
  }
}

process.on('SIGTERM', serverTermination)
process.on('SIGINT', serverTermination)
