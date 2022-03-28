import pool from '../config/mysqlPool.js';

const checkEmailExists = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [doesEmailExistResult] = await connection.query(
    `
    SELECT 1
    FROM Users 
    WHERE email = ? AND status = 'a'
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

export default { checkEmailExists, checkNicknameExists, checkUserIdExists, getUserByEmail, getUserByUserId, insertUser };
