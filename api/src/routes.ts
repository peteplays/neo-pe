import { Express } from 'express';

import { config } from './config';
import httpGet from './shared/httpGet';

export const routes = (app: Express) => {
  app.get('/', (_, res) => {
    res.send('Welcome to the Near Earth Objects and Park Events finder API!');
  });

  app.get('/nasa-neo', async (req, res) => {
    const { start_date, end_date } = req.query;
    const url = `${config.envs.nasaUrl}/neo/rest/v1/feed`;
    const params = {
      start_date,
      end_date
    };

    res.json(await httpGet(url, params));
  });

  app.get('/park-events', async (req, res) => {
    const { stateCode, dateStart, dateEnd, pageSize, pageNumber } = req.query;
    const url = `${config.envs.parksUrl}/events`;
    const params = {
      stateCode,
      dateStart,
      dateEnd,
      pageSize,
      pageNumber
    };

    res.json(await httpGet(url, params));
  });
};
