import db from './db';

interface User {
  id: number;
  nome: string;
  cpf: string;
  tp_user: 'admin' | 'user';
  dt_nascimento: Date;
  email: string;
  senha: string;
}

class CRUDUser {
  async create(user: User) {
    const query = 'INSERT INTO jjm_users SET ?';
    const result = await db.execute(query, user);
    return (result as any).insertId;
    //return result.insertId; tem essa opição tbm, mas pelo menos no meu computdor não está funcionando, estão deixo ai para o deste individual.
  }

  async readAll(): Promise<User[]> {
    const query = 'SELECT * FROM jjm_users';
    const [rows] = await db.execute(query);
    return rows as User[];
  }

  async readOne(id: number): Promise<User | null> {
    const query = 'SELECT * FROM jjm_users WHERE id = ?';
    const [rows] = await db.execute(query, id);
    return rows[0] || null;
  }

  async update(user: User) {
    const query = 'UPDATE jjm_users SET ? WHERE id = ?';
    await db.execute(query, [user, user.id]);
  }

  async delete(id: number) {
    const query = 'DELETE FROM jjm_users WHERE id = ?';
    await db.execute(query, id);
  }
}

export default CRUDUser;