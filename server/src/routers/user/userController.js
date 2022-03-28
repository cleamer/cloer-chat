import bcrypt from 'bcrypt';
import { errorMessage, successMessage, baseMessage } from '../../lib/responseMessage.js';
import { userModel, roomModel, userRoomModel } from '../../models/index.js';
import { UserValidate } from '../../lib/validate.js';

const createUser = async (req, res) => {
  try {
    const { email, nickname, password } = req.body;

    // validation
    if (!UserValidate.email(email)) return res.json(errorMessage(baseMessage.INVALID_EMAIL));
    if (!UserValidate.nickname(nickname)) return res.json(errorMessage(baseMessage.INVALID_NICKNAME));
    if (!UserValidate.password(password)) return res.json(errorMessage(baseMessage.INVALID_PASSWORD));

    const doesEmailExistPromise = userModel.checkEmailExists(email);
    const doesNicknameExistPromise = userModel.checkNicknameExists(nickname);
    const hashedPasswordPromise = bcrypt.hash(password, 12);

    const [doesEmailExist, doesNicknameExist] = await Promise.allSettled([doesEmailExistPromise, doesNicknameExistPromise]);
    if (doesEmailExist.status === 'rejected') {
      console.error(doesEmailExist.reason);
      return res.json(errorMessage(baseMessage.DB_ERROR));
    }
    if (doesNicknameExist.status === 'rejected') {
      console.error(doesNicknameExist.reason);
      return res.json(errorMessage(baseMessage.DB_ERROR));
    }
    if (doesEmailExist.value.length) return res.json(errorMessage(baseMessage.EXISTING_EMAIL));
    if (doesNicknameExist.value.length) return res.json(errorMessage(baseMessage.EXISTING_NICKNAME));

    // create a new account
    const hashedPassword = await hashedPasswordPromise;
    const insertResult = await userModel.insertUser(email, nickname, hashedPassword).catch((error) => console.error(error));
    if (insertResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));
    const userId = insertResult.insertId;
    return res.json(successMessage(baseMessage.SUCCESS_INSERT_USER, { userId }));
  } catch (error) {
    console.error(error);
    return res.json(errorMessage(baseMessage.SERVER_ERROR));
  }
};
const joinRoom = async (req, res) => {
  try {
    const roomId = parseInt(req.params.roomId);
    const userId = req.user.userId;

    const doesUserIdExistPromise = userModel.checkUserIdExists(userId).catch((error) => console.log(error));
    const doesRoomIdExistPromise = roomModel.checkRoomIdExists(roomId).catch((error) => console.log(error));

    const [doesUserIdExist, doesRoomIdExist] = await Promise.allSettled([doesUserIdExistPromise, doesRoomIdExistPromise]);
    if (doesUserIdExist.status === 'rejected') {
      console.error(doesUserIdExist.reason);
      return res.json(errorMessage(baseMessage.DB_ERROR));
    }
    if (doesRoomIdExist.status === 'rejected') {
      console.error(doesRoomIdExist.reason);
      return res.json(errorMessage(baseMessage.DB_ERROR));
    }
    if (!doesUserIdExist.value.length) return res.json(errorMessage(baseMessage.NOT_EXISTING_USER));
    if (!doesRoomIdExist.value.length) return res.json(errorMessage(baseMessage.NOT_EXISTING_ROOM));

    const userRoomExistsResult = await userRoomModel.checkUserRoomExists(userId, roomId).catch((error) => console.log(error));
    if (userRoomExistsResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));
    if (userRoomExistsResult.length) {
      const [{ user_roomId, status }] = userRoomExistsResult;
      if (status === 'a') return res.json(errorMessage(baseMessage.USER_IN_ROOM));
      if (status === 'd') {
        const activateUserRoomResult = await userRoomModel.activateUserRoom(user_roomId).catch((error) => console.error(error));
        if (activateUserRoomResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));
      }
    } else {
      const insertUserRoomResult = await userRoomModel.insertUserRoom(userId, roomId).catch((error) => console.error(error));
      if (insertUserRoomResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));
    }
    return res.json(successMessage(baseMessage.SUCCESS_JOIN_ROOM, { userId, roomId }));
  } catch (error) {
    console.error(error);
    return res.json(errorMessage(baseMessage.SERVER_ERROR));
  }
};
const leaveRoom = async (req, res) => {
  try {
    const roomId = parseInt(req.params.roomId);
    const userId = req.user.userId;

    const doesUserIdExistPromise = userModel.checkUserIdExists(userId).catch((error) => console.log(error));
    const doesRoomIdExistPromise = roomModel.checkRoomIdExists(roomId).catch((error) => console.log(error));

    const [doesUserIdExist, doesRoomIdExist] = await Promise.allSettled([doesUserIdExistPromise, doesRoomIdExistPromise]);
    if (doesUserIdExist.status === 'rejected') {
      console.error(doesUserIdExist.reason);
      return res.json(errorMessage(baseMessage.DB_ERROR));
    }
    if (doesRoomIdExist.status === 'rejected') {
      console.error(doesRoomIdExist.reason);
      return res.json(errorMessage(baseMessage.DB_ERROR));
    }
    if (!doesUserIdExist.value.length) return res.json(errorMessage(baseMessage.NOT_EXISTING_USER));
    if (!doesRoomIdExist.value.length) return res.json(errorMessage(baseMessage.NOT_EXISTING_ROOM));

    const userRoomExistsResult = await userRoomModel.checkUserRoomExists(userId, roomId).catch((error) => console.log(error));
    if (userRoomExistsResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));

    if (userRoomExistsResult[0]?.status === 'a') {
      const userRoomId = userRoomExistsResult[0].user_roomId;
      const deleteUserRoomResult = await userRoomModel.deleteUserRoom(userRoomId).catch((error) => console.error(error));
      if (deleteUserRoomResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));
      return res.json(successMessage(baseMessage.SUCCESS_LEAVE_ROOM, { userId, roomId }));
    }
    return res.json(errorMessage(baseMessage.USER_NOT_IN_ROOM));
  } catch (error) {
    console.error(error);
    return res.json(errorMessage(baseMessage.SERVER_ERROR));
  }
};
export default { createUser, joinRoom, leaveRoom };
