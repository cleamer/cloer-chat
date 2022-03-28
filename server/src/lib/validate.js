const isNotString = (data) => typeof data !== 'string';

const UserValidate = {
  email(email) {
    if (isNotString(email)) return false;
    if (email.length > 64) return false;
    const regExp = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
    return regExp.test(email);
  },
  nickname(nickname) {
    if (isNotString(nickname)) return false;
    const regExp = new RegExp(/^[a-zA-Z0-9]{4,10}$/);
    return regExp.test(nickname);
  },
  password(password) {
    if (isNotString(password)) return false;
    const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})/);
    return regExp.test(password);
  },
};
const RoomValidate = {
  title(title) {
    if (isNotString(title)) return false;
    if (title.length > 24 || title.length < 4) return false;
    return true;
  },
  password(password) {
    if (password === undefined) return true;
    if (isNotString(password)) return false;
    if (!password.length) return false;
    return true;
  },
};

Object.freeze(UserValidate);
Object.freeze(RoomValidate);

export { UserValidate, RoomValidate };
