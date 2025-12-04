import { Router } from 'express'

import { HealthController } from './health.controller'

const router = Router()

router.route('/health').get(HealthController.health)

export { router as HealthRouter }
