import { useEffect, useState } from 'react';

import { v4 as uuid } from 'uuid';

import useTranslation from 'hooks/useTranslation';
import { useGetConversationQuery } from 'services/conversation/conversation';
import { CHAT, HOME } from 'constants/constants';

import profile from 'assets/profile.svg';

import './styles.scss';

const Chats = () => {
  const [matchList, setMatchList] = useState([]);
  const [tabSelected, setTabSelected] = useState(HOME);

  const { data: matchConversations } = useGetConversationQuery();
  const user = JSON.parse(localStorage.getItem('user'));
  const t = useTranslation();
  const getMatches = () => {
    const matches = matchConversations?.matches || [];
    setMatchList(matches);
  };

  useEffect(() => {
    getMatches();
  }, [matchConversations]);

  const handleClickOpenChat = () => {
    setTabSelected(CHAT);
  };

  return (
    <>
      <h1>{t('home.title')}</h1>
      <img alt="profile avatar" src={profile}></img>
      <h2 className="username">{user.username}</h2>
      <hr className="margin-auto"></hr>
      <h3>{t('home.chat.title')}</h3>
      {matchList.map(match => {
        return (
          <>
            <section className="chat_box">
              <img className="match_icon" src={match.topic_icon} alt="match icon"></img>
              <button
                className="chat_button"
                src={match.topic_icon}
                key={uuid()}
                onClick={handleClickOpenChat}
              >
                {match.user.full_name}
              </button>
              <div
                className={
                  match.unread_messages === 0
                    ? 'notifications_empty_container'
                    : 'have_notifications_container'
                }
              >
                <label
                  className={
                    match.unread_messages === 0 ? 'notifications_empty' : 'have_notifications'
                  }
                >
                  {match.unread_messages}
                </label>
              </div>
            </section>
          </>
        );
      })}
    </>
  );
};

export default Chats;
