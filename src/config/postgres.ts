import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";
const isLocalhost = process.env.ENVIROMENT === "DEV";

const pool = new Pool({
  port:
    process.env.POSTGRES_PORT && parseInt(process.env.POSTGRES_PORT)
      ? parseInt(process.env.POSTGRES_PORT)
      : 5432, // Postgres server port[s]
  database: process.env.POSTGRES_DB, // Name of database to connect to
  user: process.env.POSTGRES_USER, // Username of database user
  password: process.env.POSTGRES_PASSWORD, // Password of database user
  host: isLocalhost ? process.env.POSTGRES_LOCAL : process.env.POSTGRES_HOST, // for docker-compose up db, to just run the database
});

const startSession = async () => {
  console.log("session table");
  const client = await pool.connect();

  // user exists?
  const queryUser = `SELECT EXISTS (
    SELECT 1
    FROM pg_tables
    WHERE tablename = 'users'
    );`;
  const usersExist = await pool.query(queryUser);
  if (!usersExist.rows[0].exists) {
    const createUserTable = `CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(32) NOT NULL,
      name VARCHAR(32) NOT NULL,
      password VARCHAR(32) NOT NULL
    );
    `;
    await pool.query(createUserTable);
  }

  // users_session exists?
  const querySession = `SELECT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE tablename = 'user_sessions'
        );`;

  const sessionExist = await pool.query(querySession);

  if (!sessionExist.rows[0].exists) {
    const createSessionTable = `CREATE TABLE user_sessions (sid varchar NOT NULL COLLATE "default",
          sess json NOT NULL, expire timestamp(6) NOT NULL );`;
    const addConstrant = `ALTER TABLE user_sessions ADD CONSTRAINT user_sessions_sid_unique UNIQUE (sid);`;
    //  error: there is no unique or exclusion constraint matching the ON CONFLICT specification => addCONSTRAINT fix this
    await pool.query(createSessionTable);
    await pool.query(addConstrant);
  }

  client.release();
};
export { pool, startSession };
