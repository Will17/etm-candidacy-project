import mysql from "mysql2/promise";
import config from "./config"

// Create a connection pool for better connection management
const pool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql: string, params: any) {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    connection.release();
  }
}

export default {
  query,
};