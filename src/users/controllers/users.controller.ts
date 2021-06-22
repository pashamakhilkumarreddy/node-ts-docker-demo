import argon2 from 'argon2';
import debug from 'debug';
import express from 'express';

import usersService from '../services/users.service';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = usersService.list(100, 0);
    res.status(200).send({
      success: true,
      statusMessages: ['Successfully fetched the users'],
      data: {
        users,
      },
    });
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.readById(req.body.id);
    res.status(200).send({
      success: true,
      statusMessages: ['Successfully fetched the user'],
      data: {
        user,
      },
    });
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await usersService.create(req.body);
    res.status(200).send({
      success: true,
      statusMessages: ['Successfully added the new user'],
      data: {
        id: userId,
      },
    });
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    log(await usersService.patchById(req.body.id, req.body));
    res.status(204).send({
      success: true,
      statusMessages: ['Successfully updated the user'],
    });
  }

  async put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(await usersService.putById(req.body.id, req.body));
    res.status(204).send({
      success: true,
      statusMessages: ['Successfully updated the user'],
    });
  }

  async removeUser(req: express.Request, res: express.Response) {
    log(await usersService.deleteById(req.body.id));
    res.status(204).send({
      success: true,
      statusMessages: ['Successfully updated the user'],
    });
  }
}

export default new UsersController();
