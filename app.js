import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';

const app = express();

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

app.use('/v1/api/auth', authRouter);
app.use('/v1/api/users', userRouter);
app.use('/v1/api/subscriptions', subscriptionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});

export default app;