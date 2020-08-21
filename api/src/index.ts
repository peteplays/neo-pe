import express from 'express';
import cors from 'cors';

import { config } from './config';
import { routes } from './routes';

const app = express();
const port = config.envs.port;

app.use(cors());
app.use((_, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, X-Requested-With, Accept');

  next();
});

routes(app);

app.listen(port, () => {
  console.log( `server started at http://localhost:${port}` );
});
