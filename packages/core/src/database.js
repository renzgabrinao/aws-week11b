import pg from "pg";
const { Pool } = pg;

let pool;
function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    pool = new Pool({
      connectionString,
      application_name: "",
      max: 1,
    });
  }
  return pool;
}

export async function getChats() {
  const res = await getPool().query(`
  SELECT * FROM chats
  ORDER BY timestamp DESC
  `);
  return res.rows;
}

export async function createChat(name) {
  const res = await getPool().query(
    `
  INSERT INTO chats (name)
  VALUES ($1)
  RETURNING *
  `,
    [name]
  );
  return res.rows[0];
}

export async function deleteChat(id) {
  const res = await getPool().query(
    `
  DELETE FROM chats
  WHERE id = $1
  RETURNING *
  `,
    [id]
  );
  return res.rows[0];
}

export async function updateChat(newName, id) {
  const res = await getPool().query(
    `
  UPDATE chats
  SET name = ($1)
  WHERE id = ($2)
  RETURNING *
  `,
    [newName, id]
  );
  return res.rows[0];
}

export async function getMessages(id) {
  const res = await getPool().query(
    `
  SELECT * FROM messages
  WHERE chat_id = ($1)
  ORDER BY timestamp ASC
  `,
    [id]
  );
  return res.rows;
}

export async function createMessage(chatId, content) {
  const res = await getPool().query(
    `
  INSERT INTO messages (chat_id, content)
  VALUES ($1, $2)
  RETURNING *
  `,
    [chatId, content]
  );
  return res.rows[0];
}

export async function deleteMessage(id) {
  const res = await getPool().query(
    `
  DELETE FROM messages
  WHERE id = $1
  RETURNING *
  `,
    [id]
  );
  return res.rows[0];
}

export async function updateMessage(content, messageId) {
  const res = await getPool().query(
    `
    UPDATE messages 
    SET content = ($1)
    WHERE id = ($2)
    `,
    [content, messageId]
  );
  return res.rows[0];
}
