import { Router } from 'express'

import { authentication } from '@/middlewares/authentication'

import { MessageController } from './message.controller'
import { upload } from '@/middlewares/multer'

const router = Router()

router.route('/messages/:id').get(authentication, MessageController.getMessages)

router.route('/messages/:id')
  .post(
    authentication,
    upload.single('image'),
    MessageController.sendMessage
  )

export { router as MessageRouter }
