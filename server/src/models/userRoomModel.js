import pool from '../config/mysqlPool.js';

const checkUserRoomExists = async (userId, roomId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [doesUserRoomExistResult] = await connection.query(
    `
    SELECT user_roomId, status
    FROM Users_Rooms 
    WHERE userId = ? AND roomId = ?
    ;`,
    [userId, roomId]
  );
  connection.release();
  return doesUserRoomExistResult;
};
const insertUserRoom = async (userId, roomId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [insertUserRoomResult] = await connection.query(
    `
    INSERT INTO Users_Rooms(userId, roomId) VALUE (?, ?)
    ;`,
    [userId, roomId]
  );
  connection.release();
  return insertUserRoomResult;
};

const activateUserRoom = async (userRoomId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [activateUserRoomResult] = await connection.query(
    `
    UPDATE Users_Rooms SET status = 'a' WHERE user_roomId = ?
    ;`,
    [userRoomId]
  );
  connection.release();
  return activateUserRoomResult;
};
const deleteUserRoom = async (userRoomId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [deleteUserRoomResult] = await connection.query(
    `
    UPDATE Users_Rooms SET status = 'd' WHERE user_roomId = ?
    ;`,
    [userRoomId]
  );
  connection.release();
  return deleteUserRoomResult;
};

export default { checkUserRoomExists, insertUserRoom, activateUserRoom, deleteUserRoom };
