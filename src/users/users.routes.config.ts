import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes() {
    this.app
      .route('/users')
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send({
          messages: ['List of users'],
        });
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send({
          messages: ['Post of users'],
        });
      });

    this.app
      .route('users/:userId')
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction,
        ) => {
          next();
        },
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send({
          messages: [`GET requested for id: ${req.params.userId}`],
        });
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send({
          messages: [`PUT requested for id: ${req.params.userId}`],
        });
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send({
          messages: [`PATCH requested for id: ${req.params.userId}`],
        });
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send({
          messages: [`DELETE requested for id ${req.params.userId}`],
        });
      });
    return this.app;
  }
}
