import db from './db';

// Interface para o Processo
interface Processo {
  id?: number;
  tipo_de_processo: string;
  status: string;
  localizacao: string;
  detalhes: string;
  responsavel_id: number;
  outras_informacoes?: string;
}

// CRUD de processos
class CRUDProcesso {
  
  // Método para criar um novo processo
  async create(processo: Processo) {
    const query = `
      INSERT INTO processos 
      (tipo_de_processo, status, localizacao, detalhes, responsavel_id, outras_informacoes) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
      processo.tipo_de_processo,
      processo.status,
      processo.localizacao,
      processo.detalhes,
      processo.responsavel_id,
      processo.outras_informacoes || null
    ];

    const result = await db.execute(query, values);
    return (result as any).insertId; // Retorna o ID do novo processo inserido
  }

  // Método para ler todos os processos
  async readAll(): Promise<Processo[]> {
    const query = 'SELECT * FROM processos';
    const [rows] = await db.execute(query);
    return rows as Processo[];
  }

  // Método para ler um único processo pelo ID
  async readOne(id: number): Promise<Processo | null> {
    const query = 'SELECT * FROM processos WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    return (rows as Processo[])[0] || null;
  }

  // Método para atualizar um processo
  async update(processo: Processo) {
    const query = `
      UPDATE processos 
      SET tipo_de_processo = ?, status = ?, localizacao = ?, detalhes = ?, responsavel_id = ?, outras_informacoes = ? 
      WHERE id = ?`;

    const values = [
      processo.tipo_de_processo,
      processo.status,
      processo.localizacao,
      processo.detalhes,
      processo.responsavel_id,
      processo.outras_informacoes || null,
      processo.id
    ];

    await db.execute(query, values);
  }

  // Método para deletar um processo
  async delete(id: number) {
    const query = 'DELETE FROM processos WHERE id = ?';
    await db.execute(query, [id]);
  }
}

export default CRUDProcesso;
