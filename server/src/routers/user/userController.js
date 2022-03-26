import bcrypt from 'bcrypt';
import userModel from './userModel.js';
import { errorMessage, successMessage, baseMessage } from '../../lib/responseMessage.js';
import validate from '../../lib/validate.js';

const createUser = async (req, res) => {
  try {
    const { email, nickname, password } = req.body;

    // validation
    if (!validate.email(email)) return res.json(errorMessage(baseMessage.INVALID_EMAIL));
    if (!validate.nickname(nickname)) return res.json(errorMessage(baseMessage.INVALID_NICKNAME));
    if (!validate.password(password)) return res.json(errorMessage(baseMessage.INVALID_PASSWORD));

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

export default { createUser };
