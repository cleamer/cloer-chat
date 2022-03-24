const email = (email) => {
  if (email.length > 64) return false;
  const regExp = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
  return regExp.test(email);
};

const nickname = (nickname) => {
  const regExp = new RegExp(/^[a-zA-Z0-9]{4,10}$/);
  return regExp.test(nickname);
};

const password = (password) => {
  const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})/);
  return regExp.test(password);
};

export default { email, nickname, password };
