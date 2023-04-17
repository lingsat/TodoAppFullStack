import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import 'dotenv/config';

import AppRouter from './routes';
import connectDB from './config/database';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { setStrategy } from './config/passport';

const app = express();
const router = new AppRouter(app);
// Connect to Postgres
connectDB();

// Express configuration
app.set('port', process.env.PORT || 4200);

// Passport
app.use(passport.initialize());
setStrategy(passport);

// Cors
app.use(cors());

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

const port = app.get('port');
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

// Error Handler
app.use(errorHandler);

export default server;
