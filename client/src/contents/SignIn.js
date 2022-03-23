import React from 'react';

const SignIn = () => {
  return (
    <>
      <input type='email' name='email' placeholder='E-mail' autoComplete='off' />
      <input type='password' name='password' placeholder='Password' autoComplete='current-password' />
      <input type='submit' value='Sign In' />
    </>
  );
};

export default SignIn;
