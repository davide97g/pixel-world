import type { Express, Request, Response } from 'express';

import { version } from '../../package.json';

export const addPublicRoutes = (app: Express) => {
  app.get('/', (_: Request, res: Response) => {
    res.send({ message: 'Pxel Server', version });
  });

  return app;
};
