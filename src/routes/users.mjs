import { randomUUID } from 'crypto';
import express from 'express';

const usersRoutes = express.Router();

const users = [];

function findUserIndexByUUID(uuid) {
  return users.findIndex((existingUser) => existingUser.uuid === uuid);
}

usersRoutes
  .get('/', (req, res) => {
    const { uuid } = req.query;

    res.json(users.find((user) => user.uuid === uuid) || users);
  })
  .put('/', (req, res) => {
    const {
      uuid = randomUUID(),
      name,
      age,
    } = req.body;

    const user = { uuid, name, age };

    const index = findUserIndexByUUID(uuid);
    if (index > -1) {
      users[index] = user;
    } else {
      users.push(user);
    }

    res.json(user);
  })
  .delete('/:uuid', (req, res) => {
    const { uuid } = req.params;
    const index = findUserIndexByUUID(uuid);
    if (index > -1) {
      users.splice(index, 1);
      res.json('gone!');
    } else {
      res.json('user not found!');
    }
  });

export default usersRoutes;
