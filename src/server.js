import compression from 'compression';
import express from 'express';
import usersRoutes from './routes/users.mjs';

const port = 3000;

const server = express();
server.use(express.json());
server.use(compression());

server.get('/', (req, res) => {
  res.json('Hello World!');
});

server.use('/users', usersRoutes);

server.listen(port, () => {
  process.stdout.write(`Server started on port: ${port}`);
});
