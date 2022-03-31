import bcrypt from 'bcrypt';
import { errorMessage, successMessage, baseMessage } from '../../lib/responseMessage.js';
import { roomModel, userRoomModel } from '../../models/index.js';
import { RoomValidate } from '../../lib/validate.js';

const createRoom = async (req, res) => {
  try {
    const { title, password } = req.body;
    if (!RoomValidate.title(title)) return res.json(errorMessage(baseMessage.INVALID_TITLE));
    if (!RoomValidate.password(password)) return res.json(errorMessage(baseMessage));

    const doesTitleExist = await roomModel.checkTitleExists(title);
    if (doesTitleExist.length) return res.json(errorMessage(baseMessage.EXISTING_TITLE));
    let hashedPassword = null;
    if (password !== undefined || password !== null || password !== '') hashedPassword = await bcrypt.hash(password, 12);

    // FIXME: create a room that has the same title as a deleted room's
    const insertRoomResult = await roomModel.insertRoom(title, hashedPassword).catch((error) => console.error(error));
    if (insertRoomResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));

    const roomId = insertRoomResult.insertId;
    const userId = req.user.userId;
    const insertUserRoomResult = await userRoomModel.insertUserRoom(userId, roomId).catch((error) => console.error(error));
    if (insertUserRoomResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));

    return res.json(successMessage(baseMessage.SUCCESS_INSERT_ROOM, { roomId }));
  } catch (error) {
    console.error(error);
    return res.json(errorMessage(baseMessage.SERVER_ERROR));
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.selectAllRooms().catch((error) => console.error(error));
    if (rooms === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));
    return res.json(successMessage(baseMessage.SUCCESS_GET_ALL_ROOMS, { rooms }));
  } catch (error) {
    console.error(error);
    return res.json(errorMessage(baseMessage.SERVER_ERROR));
  }
};
const deleteRoom = async (req, res) => {
  try {
    const roomId = parseInt(req.params.roomId);
    //FIXME:
    return res.json({ message: 'delete room' });
  } catch (error) {
    console.error(error);
    return res.json(errorMessage(baseMessage.SERVER_ERROR));
  }
};

export default { createRoom, getAllRooms, deleteRoom };
