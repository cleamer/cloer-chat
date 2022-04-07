import bcrypt from 'bcrypt';
import { errorMessage, successMessage, baseMessage } from '../../lib/responseMessage.js';
import { userModel, roomModel, userRoomModel } from '../../models/index.js';
import { UserValidate } from '../../lib/validate.js';
import { promiseAllSettled } from '../../lib/promise.js';

const createUser = async (req, res) => {
  try {
    const { email, nickname, password } = req.body;

    // validation
    if (!UserValidate.email(email)) return res.json(errorMessage(baseMessage.INVALID_EMAIL));
    if (!UserValidate.nickname(nickname)) return res.json(errorMessage(baseMessage.INVALID_NICKNAME));
    if (!UserValidate.password(password)) return res.json(errorMessage(baseMessage.INVALID_PASSWORD));

    const checkEmailExistsPromise = userModel.checkEmailExists(email);
    const checkNicknameExistsPromise = userModel.checkNicknameExists(nickname);
    const hashedPasswordPromise = bcrypt.hash(password, 12);

    const { rejected, fulfilled } = await promiseAllSettled([checkEmailExistsPromise, checkNicknameExistsPromise]);
    if (rejected.length) {
      rejected.forEach((rejectedResult) => console.error(rejectedResult.reason));
      return res.json(errorMessage(baseMessage.DB_ERROR));
    }
    const [[existingUser], [doesNicknameExist]] = fulfilled.map((rejectedResult) => rejectedResult.value);
    if (doesNicknameExist) return res.json(errorMessage(baseMessage.EXISTING_NICKNAME));

    const hashedPassword = await hashedPasswordPromise;
    if (existingUser) {
      const { userId, status } = existingUser;
      if (status === 'a') return res.json(errorMessage(baseMessage.EXISTING_EMAIL));
      if (status === 'd') {
        const rejoinUserResult = await userModel.rejoinUser(userId, nickname, hashedPassword).catch((error) => console.error(error));
        if (rejoinUserResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));
        return res.json(successMessage(baseMessage.SUCCESS_REJOIN_USER, { userId }));
      }
    }
    const insertResult = await userModel.insertUser(email, nickname, hashedPassword).catch((error) => console.error(error));
    if (insertResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));
    const userId = insertResult.insertId;
    return res.json(successMessage(baseMessage.SUCCESS_INSERT_USER, { userId }));
  } catch (error) {
    console.error(error);
    return res.json(errorMessage(baseMessage.SERVER_ERROR));
  }
};
//TODO: update user info
const patchUser = async (req, res) => {
  try {
    const userId = req.user.userId;
  } catch (error) {
    console.error(error);
    return res.json(errorMessage(baseMessage.SERVER_ERROR));
  }
};
const getUserInfo = async (req, res) => {
  const userInfo = req.user;
  res.json(successMessage(baseMessage.SUCCESS_GET_USER_INFO, { userInfo }));
};

const removeUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const doesUserIdExist = await userModel.checkUserIdExists(userId).catch((error) => console.log(error));
    if (doesUserIdExist === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));
    if (!doesUserIdExist.length) return res.json(errorMessage(baseMessage.NOT_EXISTING_USER));

    const deleteUserRoomResult = await userRoomModel.deleteUserRoomByUserId(userId).catch((error) => console.log(error));
    if (deleteUserRoomResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));

    const deleteUserResult = await userModel.deleteUser(userId).catch((error) => console.log(error));
    if (deleteUserResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));

    // TODO: make a function that checks member count of the room when a user remove or leave the room and broadcast using WS

    return res.json(successMessage(baseMessage.SUCCESS_DELETE_USER, { userId }));
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

    const [userRoomExists] = userRoomExistsResult;
    // no user_room: undefined & deleted user_room: 'd'
    if (userRoomExists?.status !== 'a') return res.json(errorMessage(baseMessage.USER_NOT_IN_ROOM));

    const userRoomId = userRoomExists.user_roomId;
    const deleteUserRoomResult = await userRoomModel.deleteUserRoom(userRoomId).catch((error) => console.error(error));
    if (deleteUserRoomResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));

    const countUsersInRoomResult = await roomModel.countUsersInRoom(roomId).catch((error) => console.error(error));
    if (countUsersInRoomResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));
    const [{ count }] = countUsersInRoomResult;
    if (!count) {
      const deleteRoomResult = await roomModel.deleteRoom(roomId).catch((error) => console.error(error));
      if (deleteRoomResult === undefined) return res.json(errorMessage(baseMessage.DB_ERROR));
      //TODO: socket broadcast: a room was deleted
    }

    return res.json(successMessage(baseMessage.SUCCESS_LEAVE_ROOM, { userId, roomId }));
  } catch (error) {
    console.error(error);
    return res.json(errorMessage(baseMessage.SERVER_ERROR));
  }
};
export default { createUser, joinRoom, getUserInfo, leaveRoom, patchUser, removeUser };
