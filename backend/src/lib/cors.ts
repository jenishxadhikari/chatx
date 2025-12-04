import type { CorsOptions } from 'cors'

import { env } from '@/config/env'

export const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (requestOrigin === env.APP_ORIGIN) {
      callback(null, true)
    } else {
      callback(env.NODE_ENV === 'development' ? null : new Error('Not allowed by CORS.'))
    }
  },
  credentials: true
}
