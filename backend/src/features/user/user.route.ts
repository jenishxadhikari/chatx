import { Router } from 'express'

import { authentication } from '@/middlewares/authentication'
import { validation } from '@/middlewares/validation'

import { UserController } from './user.controller'
import { UserSchema } from './user.schema'

const router = Router()

router.route('/users').get(authentication, UserController.getUsers)

router.route('/users')
  .patch(
    validation(UserSchema.updateUserSchema),
    authentication,
    UserController.updateProfile
  )

export { router as UserRoute }
