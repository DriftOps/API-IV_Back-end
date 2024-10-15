import db from './db';

interface Client {
  id: number;
  nome: string;
  cpf: string;
  dt_nascimento: Date;
  email: string;
  senha: string;
}

class CRUDClient {
  async create(Client: Client) {
    const query = 'INSERT INTO jjm_users SET ?';
    const result = await db.execute(query, Client);
    return (result as any).insertId;
    //return result.insertId; tem essa opção tbm, mas pelo menos no meu computdor não está funcionando, então deixo ai para uso deste individual.
  }

  async readAll(): Promise<Client[]> {
    const query = 'SELECT * FROM jjm_users';
    const [rows] = await db.execute(query);
    return rows as Client[];
  }

  async readOne(id: number): Promise<Client | null> {
    const query = 'SELECT * FROM jjm_users WHERE id = ?';
    const [rows] = await db.execute(query, id);
    return rows[0] || null;
  }

  async update(client: Client) {
    const query = 'UPDATE jjm_users SET ? WHERE id = ?';
    await db.execute(query, [client, client.id]);
  }

  async delete(id: number) {
    const query = 'DELETE FROM jjm_users WHERE id = ?';
    await db.execute(query, id);
  }
}

export default CRUDClient;