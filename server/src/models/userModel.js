import pool from '../config/mysqlPool.js';

const checkEmailExists = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [doesEmailExistResult] = await connection.query(
    `
    SELECT userId, status
    FROM Users 
    WHERE email = ?
    ;`,
    [email]
  );
  connection.release();
  return doesEmailExistResult;
};
const checkNicknameExists = async (nickname) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [doesNicknameExistResult] = await connection.query(
    `
    SELECT 1
    FROM Users 
    WHERE nickname = ? AND status = 'a'
    ;`,
    [nickname]
  );
  connection.release();
  return doesNicknameExistResult;
};
const checkUserIdExists = async (userId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [doesUserIdExistResult] = await connection.query(
    `
    SELECT 1 
    FROM Users 
    WHERE userId = ? AND status = 'a'
    ;`,
    [userId]
  );
  connection.release();
  return doesUserIdExistResult;
};
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
const insertUser = async (email, nickname, password) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [insertUserResult] = await connection.query(
    `
    INSERT INTO Users(email, nickname, password) VALUE (?, ?, ?)
    ;`,
    [email, nickname, password]
  );
  connection.release();

  return insertUserResult;
};
const deleteUser = async (userId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [deleteUserResult] = await connection.query(
    `
    UPDATE Users SET status = 'd' WHERE userId = ?
    ;`,
    [userId]
  );
  connection.release();

  return deleteUserResult;
};
const rejoinUser = async (userId, nickname, password) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [rejoinUserResult] = await connection.query(
    `
    UPDATE Users SET nickname = ?, password = ?, status = 'a' WHERE userId = ?
    ;`,
    [nickname, password, userId]
  );
  connection.release();

  return rejoinUserResult;
};

export default { checkEmailExists, checkNicknameExists, checkUserIdExists, getUserByEmail, getUserByUserId, insertUser, deleteUser, rejoinUser };
