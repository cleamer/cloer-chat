import Message from './Message';
import styles from './MessageList.module.css';

const MessageList = ({ messages }) => {
  console.log('MessageList');
  console.log(messages);

  return (
    <>
      <div className={styles.chatBox}>
        {messages.map(({ ...data }, i) => (
          <Message key={i} data={data} />
        ))}
      </div>
    </>
  );
};

export default MessageList;
