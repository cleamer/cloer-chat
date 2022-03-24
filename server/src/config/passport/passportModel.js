import pool from '../mysqlPool.js';

const getUserByEmail = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [getUserByEmailResult] = await connection.query(
    `
    SELECT userId, email, nickname, password, updatedAt ,status
    FROM Users
    WHERE email = ?
    ;`,
    [email]
  );
  connection.release();
  return getUserByEmailResult;
};
const getUserByUserId = async (userId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [getUserByUserIdResult] = await connection.query(
    `
    SELECT userId, email, nickname
    FROM Users
    WHERE userId = ? AND status = 'a'
    ;`,
    [userId]
  );
  connection.release();
  return getUserByUserIdResult;
};
export default { getUserByEmail, getUserByUserId };
