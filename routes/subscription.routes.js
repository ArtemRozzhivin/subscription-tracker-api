import { Router } from 'express';

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => {
  res.send({title:'GET all Subscription'});
});

subscriptionRouter.get('/:id', (req, res) => {
  res.send({title:'GET Subscription by id'});
});

subscriptionRouter.post('', (req, res) => {
  res.send({title:'POST Subscription'});
});

subscriptionRouter.put('/:id', (req, res) => {
  res.send({title:'PUT Subscription'});
});

subscriptionRouter.delete('/:id', (req, res) => {
  res.send({title:'DELETE Subscription'});
});

subscriptionRouter.get('/user/:id', (req, res) => {
  res.send({title:'GET User Subscription'});
});

subscriptionRouter.put('/user/:id/cancel', (req, res) => {
  res.send({title:'Cancel User Subscription'});
});


export default subscriptionRouter;