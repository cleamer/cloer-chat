import React from 'react';

const SignIn = () => {
  return (
    <>
      <input type='email' name='email' placeholder='E-mail' autoComplete='off' />
      <input type='nickname' name='nickname' placeholder='Nickname' autoComplete='off' />
      <input type='password' name='password' placeholder='Password' autoComplete='new-password' />
      <input type='password' name='confirmPassword' placeholder='Confirm Password' autoComplete='off' />
      <input type='submit' value='Sign Up' />
    </>
  );
};

export default SignIn;
