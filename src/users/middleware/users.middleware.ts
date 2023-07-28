import type express from 'express'
import debug from 'debug'
import userService from '../services/users.service.js'

const log: debug.IDebugger = debug('app:users-controller')

class UsersMiddleware {
  async validateRequiredUserBodyFields (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    const { email, password } = req.body
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (req.body && email && password) {
      next()
    } else {
      res.status(400).send({
        success: false,
        statusCode: 400,
        statusMessages: ['Missing required fields email and password']
      })
    }
  }

  async validateSameEmailDoesntExist (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    const { email } = req.body
    const user = await userService.getUserByEmail(email)
    if (user != null) {
      res.status(400).send({
        success: false,
        statusCode: 400,
        statusMessages: ['User email already exists']
      })
    } else {
      next()
    }
  }

  async validateUserExists (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    const { userId } = req.body
    const user = await userService.readById(userId)
    if (user != null) {
      next()
    } else {
      res.status(404).send({
        success: false,
        statusCode: 404,
        statusMessages: [`User ${req.params.userId} not found`]
      })
    }
  }

  async validateSameEmailBelongToSameUser (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    const { email } = req.body
    const user = await userService.getUserByEmail(email)
    if ((user != null) && user.id === req.params.userId) {
      next()
    } else {
      res.status(400).send({
        success: false,
        statusCode: 400,
        statusMessages: ['Invalid email']
      })
    }
  }

  validatePatchEmail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const { email } = req.body
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (email) {
      log('Validating email', email)
      await this.validateSameEmailBelongToSameUser(req, res, next)
    } else {
      next()
    }
  }

  async extractUserId (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    req.body.id = req.params.userId
    next()
  }
}

export default new UsersMiddleware()
