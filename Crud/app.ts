import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import CRUD from './crud';

const app = express();
app.use(bodyParser.json());

const crud = new CRUD();

app.post('/users', async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const id = await crud.create(user);
    res.status(201).send(`User  created with ID ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await crud.readAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving users');
  }
});

app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await crud.readOne(id);
    if (!user) {
      res.status(404).send('User  not found');
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user');
  }
});

app.put('/users/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = req.body;
      await crud.update(user);
      res.send(`User  updated with ID ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating user');
    }
});

app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      await crud.delete(id);
      res.send(`User  deleted with ID ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting user');
    }
});