import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import Message from './components/Message';
import Chat from './components/Chat';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [currentChat, setCurrentChat] = useState("");

  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState("");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    axios.get(apiUrl + "/chats")
    .then(res => setChats(res.data.chats));
  }, []); 

  const handleNewChat = (e) => {
    e.preventDefault();
    if(!!!newChat) {
      setErrorMsg("You need to enter a name");
      return;
    }
    axios.post(apiUrl + "/chats", {
      name: newChat
    })
    .then(res => setChats(res.data.chats));
    setErrorMsg(null);
  } 

  const getChatMessages = (id) => {
    setCurrentChat(id);

    axios.get(apiUrl + "/messages/" + id)
    .then(res => setMessages(res.data.messages));

  }

  const handleCreateMessage = (e) => {
    e.preventDefault();

    const form = {
      chatId: currentChat,
      content: newMessage
    }

    axios.post(apiUrl + "/messages", form)
    .then(res => setMessages(res.data.messages));

    setNewMessage("");
  }

  return (
    <div className="min-h-screen bg-stone-800 text-white flex flex-row p-4">
      <div className='basis-1/5'>
        <form 
          className='flex flex-col justify-evenly text-xl text-center mb-7 h-32'
          onSubmit={handleNewChat}
        >
          <input 
            className='text-black'
            type="text" 
            onChange={(e) => {setNewChat(e.target.value)}}
            value={newChat}
          />
          <button className='bg-green-500 rounded-2xl h-9' type='submit'>create new room</button>
          {!!errorMsg ? <h2 className='text-red-500'>{errorMsg}</h2>: <></>}
        </form>

        <div>
          <h1 className='text-3xl mb-4'>rooms</h1>
          {!!chats && chats.map(room => (
            <>  
              <div key={room.id}>
                <Chat room={room} getChatMessages={getChatMessages} setChats={setChats}/>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className='basis-4/5'>
        <div className='h-[90%] p-5'>
          {!!messages && messages.map(msg => (
            <div key={msg.id}>
              <Message msg={msg} currentChat={currentChat} setMessages={setMessages}/>

            </div>
          ))}
        </div>

        <div className='h-[10%]'>
          {currentChat ?          
            <form className='flex flex-row h-full border-2 border-stone-900 rounded' onSubmit={handleCreateMessage}>
              <input 
                className='text-black text-base p-3 flex-grow'
                type="text"
                onChange={(e) => {setNewMessage(e.target.value)}}
                value={newMessage}
              />
              <button className='p-3 bg-green-800' type='submit'>Enter</button>
            </form>
            :
            <>
            </>
          }
        </div>
      </div>

     

    </div>
  )
}

export default App
