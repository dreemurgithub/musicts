import { pool } from "../../config/postgres";

const addUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  const query = {
    text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    values: [username, email, password],
  };
  const result = await pool.query(query.text, query.values);
  return result;
};

const checkSignin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const query = {
    text: "INSERT SELECT * FROM users WHERE email = $1 AND password = $2 (email, password) VALUES ($1, $2)",
    values: [email, password],
  };
  const result = await pool.query(query.text, query.values);
  return result;
};

export { addUser,checkSignin };
