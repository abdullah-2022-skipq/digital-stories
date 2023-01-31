import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import dbConnect from './database';
import { PORT } from './config';
import router from './routes/index';
import { errorHandler } from './middlewares';
import swaggerJsDocs from './docs/api-docs';

dbConnect();

const app = express();

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000'],
};

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json({ limit: '5mb' }));

app.use('/storage', express.static('storage'));

app.use('/api', router);

app.use(errorHandler);

// docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Backend Server is up and running on port ${PORT}`);
});
