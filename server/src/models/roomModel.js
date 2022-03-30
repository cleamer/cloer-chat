import pool from '../config/mysqlPool.js';

const checkRoomIdExists = async (roomId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [doesRoomIdExistResult] = await connection.query(
    `
    SELECT 1 
    FROM Rooms 
    WHERE roomId = ? AND status = 'a'
    ;`,
    [roomId]
  );
  connection.release();
  return doesRoomIdExistResult;
};
const checkTitleExists = async (title) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [doesTitleExistResult] = await connection.query(
    `
    SELECT roomId
    FROM Rooms
    WHERE title = ? AND status = 'a'
    ;`,
    [title]
  );
  connection.release();
  return doesTitleExistResult;
};
const insertRoom = async (title, password) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [insertRoomResult] = await connection.query(
    `
    INSERT INTO Rooms(title, password) VALUE (?, ?)
    ;`,
    [title, password]
  );
  connection.release();
  return insertRoomResult;
};
const deleteRoom = async (roomId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [deleteRoomResult] = await connection.query(
    `
    UPDATE Rooms SET status = 'd' WHERE roomId = ?
    ;`,
    [roomId]
  );
  connection.release();
  return deleteRoomResult;
};
const selectAllRooms = async () => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [selectAllRoomsResult] = await connection.query(
    `
    SELECT roomId, title
    FROM Rooms
    WHERE status = 'a'
    ORDER BY updatedAt DESC
    ;`
  );
  connection.release();
  return selectAllRoomsResult;
};
const countUsersInRoom = async (roomId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const [countUsersInRoomResult] = await connection.query(
    `
    SELECT count(*) as count
    FROM Rooms R
    JOIN Users_Rooms UR on R.roomId = UR.roomId
    WHERE R.roomId = ? AND UR.status = 'a';
    ;`,
    [roomId]
  );
  connection.release();
  return countUsersInRoomResult;
};

export default { checkRoomIdExists, checkTitleExists, insertRoom, deleteRoom, selectAllRooms, countUsersInRoom };
