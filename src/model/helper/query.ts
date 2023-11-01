import { pool } from "@/config/postgres";

const addUserQuery = async ({
  name,
  password,
  username,
}: {
  name: string;
  password: string;
  username: string;
}) => {
  const query = {
    text: "INSERT INTO users (username, name, password) VALUES ($1, $2, $3)",
    values: [username, name, password],
  };
  const result = await pool.query(query.text, query.values);
  return result;
};

const checkUsername = async (username: string) => {
  const query = {
    text: "SELECT * FROM users WHERE username = $1",
    values: [username],
  };
  const result = await pool.query(query.text, query.values);
  return result.rowCount;
};

const checkSignin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const query = {
    text: "SELECT * FROM users WHERE username = $1 AND password = $2",
    values: [username, password],
  };
  const result = await pool.query(query.text, query.values);
  return result;
};

const editUserQuery = async ({
  name,
  password,
  username,
  id,
}: {
  name: string;
  password: string;
  username: string;
  id: number;
}) => {
  const query = {
    text: "UPDATE users SET name = $1, password = $2 WHERE id = $4 and username = $3",
    values: [name, password, username, id],
  };
  const result = await pool.query(query.text, query.values);
  return result;
};

export { addUserQuery, checkSignin,  checkUsername, editUserQuery };
