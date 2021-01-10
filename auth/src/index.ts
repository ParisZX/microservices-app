import * as express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import * as mongoose from 'mongoose';

// routes
import {currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';

// middlewares
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

// use middlewares
app.use(json());

// use routes
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

// 404 - not found
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('[auth] Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

app.listen(3000, () => {
  console.log('[auth] Listening on port 3000');
});

start();