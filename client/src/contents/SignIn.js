import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useUser } from '../contexts/userContext'; //FIXME:
import { useHTTP } from '../hooks/useAPI';
import { UserValidate } from '../lib/validate';
import styles from './SignInUp.module.css';

const SignIn = () => {
  const navigate = useNavigate();
  const laocation = useLocation();
  const setWarningMessage = useOutletContext();
  const HTTP = useHTTP();
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isVaildInputsRef = useRef({ email: false, password: false });
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
    return () => setWarningMessage('');
  }, []);

  useEffect(() => {
    isVaildInputsRef.current.email = UserValidate.email(email);
    isVaildInputsRef.current.password = UserValidate.password(password);

    if (email === '' || password === '') {
      if (laocation.state) {
        setWarningMessage(laocation.state.message);
        laocation.state = null;
      } else setWarningMessage('');
    } else if (!isVaildInputsRef.current.email) setWarningMessage('Wrong or invalid e-mail address.');
    else if (!isVaildInputsRef.current.password)
      setWarningMessage('Password must contain at least 1 lowercase, uppercase, numeric, special character and be a 4 charctors or longer.');
    else setWarningMessage('');
  }, [email, password]);

  const submitHandler = async () => {
    if (isVaildInputsRef.current.email && isVaildInputsRef.current.password) {
      try {
        const data = await HTTP('post', '/auth', { email, password });
        if (data.isSuccess) {
          const userInfo = data.result;
          setUser(userInfo);
          return navigate('/', { replace: true });
        }
        setWarningMessage(data.message);
      } catch (error) {
        console.log(error);
        setWarningMessage('Browser Error :(');
      }
    }
  }; //TODO: fetchRooms(url, setState)

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

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
        required
        value={email}
        onChange={emailHandler}
      />
      <input
        className={`${styles.input} ${styles.text} ${styles.lastText}`}
        type='password'
        name='password'
        placeholder='Password'
        autoComplete='new-password'
        minLength='4'
        required
        value={password}
        onChange={passwordHandler}
      />
      <button className={`${styles.input} ${styles.button}`} onClick={submitHandler}>
        Sign In
      </button>
      <Link to='/sign/up'>
        <button className={`${styles.input} ${styles.button}`}>Sign Up</button>
      </Link>
    </>
  );
};

export default SignIn;
