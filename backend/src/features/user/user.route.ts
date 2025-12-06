import { Router } from 'express'

import { authentication } from '@/middlewares/authentication'
import { upload } from '@/middlewares/multer'

import { UserController } from './user.controller'

const router = Router()

router.route('/users').get(authentication, UserController.getUsers)
router.route('/users/:id').get(authentication, UserController.getUser)

router.route('/users')
  .patch(
    authentication,
    upload.single('avatar'),
    UserController.updateProfile
  )

export { router as UserRouter }
