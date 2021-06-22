import express from 'express';
import debug from 'debug';
import userService from '../services/users.service';

const log: debug.IDebugger = debug('app:users-controller');

class UsersMiddleware {
  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({
        success: false,
        statusCode: 400,
        statusMessages: ['Missing required fields email and password'],
      });
    }
  }

  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).send({
        success: false,
        statusCode: 400,
        statusMessages: ['User email already exists'],
      });
    } else {
      next();
    }
  }

  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await userService.readById(req.body.userId);
    if (user) {
      next();
    } else {
      res.status(404).send({
        success: false,
        statusCode: 404,
        statusMessages: [`User ${req.params.userId} not found`],
      });
    }
  }

  async validateSameEmailBelongToSameUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    if (user && user.id === req.params.userId) {
      next();
    } else {
      res.status(400).send({
        success: false,
        statusCode: 400,
        statusMessages: ['Invalid email'],
      });
    }
  }

  validatePatchEmail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (req.body.email) {
      log('Validating email', req.body.email);
      this.validateSameEmailBelongToSameUser(req, res, next);
    } else {
      next();
    }
  }

  async extractUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    req.body.id = req.params.userId;
    next();
  }
}

export default new UsersMiddleware();
