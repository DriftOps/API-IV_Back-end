import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import CRUDUser from './user';
import CRUDClient from './client';

const app = express();
app.use(bodyParser.json());

//CRUD de Usuários

const crudUser = new CRUDUser();

app.post('/users', async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const id = await crudUser.create(user);
    res.status(201).send(`User  created with ID ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await crudUser.readAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving users');
  }
});

app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await crudUser.readOne(id);
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
      await crudUser.update(user);
      res.send(`User  updated with ID ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating user');
    }
});

app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      await crudUser.delete(id);
      res.send(`User  deleted with ID ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting user');
    }
});

// CRUD de Clientes

const crudClient = new CRUDClient();

app.post('/clients', async (req: Request, res: Response) => {
  try {
    const client = req.body;
    const id = await crudClient.create(client);
    res.status(201).send(`Client added with ID ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating client');
  }
});

app.get('/clients', async (req: Request, res: Response) => {
  try {
    const clients = await crudClient.readAll();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving clients');
  }
});

app.get('/clients/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const client = await crudClient.readOne(id);
    if (!client) {
      res.status(404).send('Client  not found');
    } else {
      res.json(client);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Client retrieving client');
  }
});

app.put('/clients/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const client = req.body;
    await crudClient.update(client);
    res.send(`Client updated with ID ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating client');
  }
});

app.delete('/clients/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await crudClient.delete(id);
    res.send(`Client deleted with ID ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting client');
  }
});