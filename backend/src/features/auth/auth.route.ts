import { Router } from 'express'

import { validation } from '@/middlewares/validation'
import { authentication } from '@/middlewares/authentication'

import { AuthController } from './auth.controller'
import { AuthSchema } from './auth.schema'

const router = Router()

router.route('/auth/register').post(validation(AuthSchema.registerSchema), AuthController.register)

router.route('/auth/login').post(validation(AuthSchema.loginSchema), AuthController.login)

router.route('/auth/refresh').get(AuthController.refresh)

router.route('/auth/logout').delete(authentication, AuthController.logout)

router.route('/auth/session').get(authentication, AuthController.session)

export { router as AuthRouter }
