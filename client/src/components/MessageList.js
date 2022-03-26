import Message from './Message';
import styles from './MessageList.module.css';

const MessageList = () => {
  const messages = [];
  const messageNum = 100;
  for (let i = 0; i < messageNum; i++) {
    messages.push({
      chatId: i,
      nickname: `cloer${i}`,
      message:
        i % 3
          ? '짧은 문장'
          : '장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문',
      updatedAt: `${Math.floor((messageNum - i) / 60)}:${(messageNum - i) % 60}`,
    });
  }
  return (
    <>
      <div className={styles.chatBox}>
        {messages.map(({ chatId, ...data }, i) => (
          <Message key={chatId} data={data} fromMe={!(i % 7)} />
        ))}
      </div>
    </>
  );
};

export default MessageList;
