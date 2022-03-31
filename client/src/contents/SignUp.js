import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHTTP } from '../hooks/useRequset';
import { UserValidate } from '../lib/validate';
import { useUpdateMessage } from '../contexts/messageContext';
import styles from './SignInUp.module.css';

const SignUp = () => {
  const updateMessage = useUpdateMessage();
  const HTTP = useHTTP();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isVaildInputsRef = useRef({ email: false, nickname: false, password: false, confirmPassword: false });
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
    return () => updateMessage('');
  }, []);

  useEffect(() => {
    isVaildInputsRef.current.email = UserValidate.email(email);
    isVaildInputsRef.current.nickname = UserValidate.nickname(nickname);
    isVaildInputsRef.current.password = UserValidate.password(password);
    isVaildInputsRef.current.confirmPassword = password === confirmPassword;

    if (email === '' || nickname === '' || password === '' || confirmPassword === '') updateMessage('');
    else if (!isVaildInputsRef.current.email) updateMessage('Wrong or invalid e-mail address.');
    else if (!isVaildInputsRef.current.nickname) updateMessage('Nickname requires minimum 4 and maximum 10 characters.');
    else if (!isVaildInputsRef.current.password) updateMessage('Password must contain at least 1 lowercase, uppercase, numeric, special character and be a 4 charctors or longer.');
    else if (!isVaildInputsRef.current.confirmPassword) updateMessage('Not match with password.');
    else updateMessage('');

    return () => updateMessage('');
  }, [email, nickname, password, confirmPassword]);

  const submitHandler = async () => {
    if (isVaildInputsRef.current.email && isVaildInputsRef.current.nickname && isVaildInputsRef.current.password && isVaildInputsRef.current.confirmPassword) {
      try {
        const response = await HTTP('post', '/users', { email, nickname, password });
        console.log(response);
        if (response.isSuccess) return navigate('/sign/in', { replace: true });
        updateMessage(response.message);
      } catch (error) {
        updateMessage('Browser Error :(');
      }
    }
  }; //TODO: fetchRooms(url, setState)

  const emailHandler = (e) => setEmail(e.target.value);
  const nicknameHandler = (e) => setNickname(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const confirmPasswordHandler = (e) => setConfirmPassword(e.target.value);

  return (
    <>
      <input
        ref={emailRef}
        className={`${styles.input} ${styles.text}`}
        type='email'
        name='email'
        placeholder='E-mail'
        autoComplete='off'
        maxLength='64'
        value={email}
        onChange={emailHandler}
      />
      <input
        className={`${styles.input} ${styles.text}`}
        type='nickname'
        name='nickname'
        placeholder='Nickname'
        autoComplete='off'
        minLength='4'
        maxLength='10'
        value={nickname}
        onChange={nicknameHandler}
      />
      <input
        className={`${styles.input} ${styles.text}`}
        type='password'
        name='password'
        placeholder='Password'
        autoComplete='new-password'
        minLength='4'
        value={password}
        onChange={passwordHandler}
      />
      <input
        className={`${styles.input} ${styles.text} ${styles.lastText}`}
        type='password'
        name='confirmPassword'
        placeholder='Confirm Password'
        autoComplete='off'
        minLength='4'
        value={confirmPassword}
        onChange={confirmPasswordHandler}
      />
      <button className={`${styles.input} ${styles.button}`} onClick={submitHandler}>
        Sign Up
      </button>
      <Link to='/sign/in'>
        <button className={`${styles.input} ${styles.button}`}>Sign In</button>
      </Link>
    </>
  );
};

export default SignUp;
