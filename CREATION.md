## Server creation steps

- [ ] Run command yarn init -y
- [ ] Run command yarn add cors
- [ ] Run command yarn add express
- [ ] Run command yarn add eslint --dev
- [ ] Run command yarn create @eslint/config
- [ ] Add in your eslintrc.json the import/extensions rule

## Your eslintrc.json should look like this
    {
        "env": {
            "es2021": true,
            "node": true
        },
        "extends": [
            "airbnb-base"
        ],
        "parserOptions": {
            "ecmaVersion": "latest",
            "sourceType": "module"
        },
        "rules": {
            "import/extensions": [
                2,
                { "mjs": "always" }
            ]
        }
    }

- [ ] Run command yarn add nodemon
- [ ] Run command yarn add compression
- [ ] In package.json create a "script" property that is an object with this property "start": "nodemon server.js" it will restart the server each time we save a file

## Here your package.json should look like
    {
      "name": "node-backend",
      "version": "1.0.0",
      "main": "server.js",
      "license": "MIT",
      "type": "module",
      "scripts": {
        "start": "nodemon src/server.js"
      },
      "dependencies": {
        "compression": "^1.7.4",
        "cors": "^2.8.5",
        "express": "^4.18.1",
        "nodemon": "^2.0.16"
      },
      "devDependencies": {
        "eslint": "^7.32.0 || ^8.2.0",
        "eslint-config-airbnb-base": "^15.0.0",
        "eslint-plugin-import": "^2.25.2"
      }
    }

- [ ] Create a file called server.js
## This is how it should look like
    import compression from 'compression';
    import cors from 'cors';
    import express from 'express';
    import usersRoutes from './routes/users.mjs';

    const port = 3000;

    const server = express();
    server.use(cors());
    server.use(express.json());
    server.use(compression());

    server.get('/', (req, res) => {
      res.json('Hello World!');
    });

    server.use('/users', usersRoutes);

    server.listen(port, () => {
      process.stdout.write(`Server started on port: ${port}`);
    });

- [ ] Create a folder called routes with a file named users.mjs

## users.mjs should look like
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
