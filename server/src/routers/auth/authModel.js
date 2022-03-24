import pool from '../../config/mysqlPool.js';

const checkEmailExists = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [doesEmailExistResult] = await connection.query(
    `
    SELECT userId
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
    SELECT userId 
    FROM Users 
    WHERE nickname = ? AND status = 'a'
    ;`,
    [nickname]
  );
  connection.release();
  return doesNicknameExistResult;
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

export default { checkEmailExists, checkNicknameExists, insertUser };
