import { randomUUID } from 'crypto';
import express from 'express';

const usersRoutes = express.Router();

const users = {};

usersRoutes
  .get('/', (req, res) => {
    const { uuid } = req.query;

    res.json(users[uuid] || users);
  })
  .put('/', (req, res) => {
    const {
      uuid = randomUUID(),
      user,
    } = req.body;

    users[uuid] = user;

    res.json(user);
  })
  .delete('/:uuid', (req, res) => {
    const { uuid } = req.params;
    delete users[uuid];
    res.json('gone!');
  });

export default usersRoutes;
