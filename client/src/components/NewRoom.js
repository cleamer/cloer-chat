import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, NavHeader, NavHeaderBack, WarningMessage } from './';
import { useHTTP } from '../hooks/useAPI';
import { RoomValidate } from '../lib/validate';
import styles from './NewRoom.module.css';

const NewRoom = () => {
  console.log('NewRoom');
  const navigate = useNavigate();
  const HTTP = useHTTP();

  const [isChecked, setIsChecked] = useState(false);
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const isVaildInputsRef = useRef({ title: false, password: false });
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    isVaildInputsRef.current.title = RoomValidate.title(title);
    isVaildInputsRef.current.password = isChecked ? RoomValidate.password(password) : true;
    if (title === '' && password === '') setWarningMessage('');
    else if (!isVaildInputsRef.current.title) setWarningMessage('E-mail error');
    else if (!isVaildInputsRef.current.password) setWarningMessage('password error');
    else setWarningMessage('');
  }, [title, password]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isVaildInputsRef.current.title && isVaildInputsRef.current.password) {
      try {
        const data = await HTTP('post', '/rooms', { title, password });
        if (data.isSuccess) {
          const roomId = data.result.roomId;
          return navigate(`/room/${roomId}`, { replace: true });
        }
        setWarningMessage(data.message);
      } catch (error) {
        console.log(error);
        setWarningMessage('Browser Error :(');
      }
    }
  };

  const titleHandler = (e) => setTitle(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const checkBoxHandler = () =>
    setIsChecked((currentChecked) => {
      const newChecked = !currentChecked;
      if (!newChecked) setPassword('');
      return newChecked;
    });

  return (
    <>
      <Header>
        <NavHeader title='Create Room' back={<NavHeaderBack />} />
      </Header>
      <form className={styles.form} onSubmit={submitHandler}>
        <WarningMessage warningMessage={warningMessage} />
        <input
          ref={titleRef}
          value={title}
          className={`${styles.input} ${styles.text}`}
          placeholder='Title'
          required
          minLength='4'
          maxLength='24'
          autoComplete='off'
          onChange={titleHandler}
        />
        <input
          value={password}
          disabled={!isChecked}
          onChange={passwordHandler}
          className={`${styles.input} ${styles.text}`}
          type='password'
          placeholder='Password'
          autoComplete='new-password'
          minLength='1'
        />
        <label className={styles.label}>
          <input className={styles.checkBox} type='checkbox' onChange={checkBoxHandler} /> <span>Do you want to make a secret room?</span>
        </label>
        <button className={`${styles.input} ${styles.button}`}>Create</button>
      </form>
    </>
  );
};

export default NewRoom;
