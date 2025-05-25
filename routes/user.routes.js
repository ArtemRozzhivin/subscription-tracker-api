import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.send('GET all User');
});

userRouter.get('/:id', (req, res) => {
  res.send('GET User by id');
});

userRouter.post('/', (req, res) => {
  res.send('POST User');
});

userRouter.put('/:id', (req, res) => {
  res.send('User');
});

userRouter.delete('/:id', (req, res) => {
  res.send('DELETE User');
});

export default userRouter;