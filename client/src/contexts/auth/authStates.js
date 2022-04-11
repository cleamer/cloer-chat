export const SignOutSuccess = () => ({
  user: null,
  isError: false,
  message: 'Logout success',
});

export const SignInSuccess = (user) => ({
  user,
  isError: false,
  message: 'Login success',
});

export const SignInFailure = (message) => ({
  user: null,
  isError: true,
  message,
});
