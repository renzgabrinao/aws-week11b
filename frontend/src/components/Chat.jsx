import { useState } from 'react';
import axios from 'axios';

export default function Chat({ room, getChatMessages, setChats }) {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [updateChat, setUpdateChat] = useState("");
  const [form, setForm] = useState(false);

  const handleDeleteChat = (id) => {
    axios.delete(apiUrl + "/chats/" + id)
    .then(res => setChats(res.data.chats));
  }

  const handleUpdateChat = (e) => {
    e.preventDefault();

    axios.put(`${apiUrl}/chats/${room.id}`, {
      newName: updateChat
    })
    .then(res => setChats(res.data.chats));

    setUpdateChat("");
    setForm(false);
  }

  return(
    <div>
      <div className='flex flex-row justify-between'>
        <h1 className='text-2xl hover:cursor-pointer' onClick={() => {getChatMessages(room.id)}}>
          {room.name}
        </h1>
        <div className='text-xl'>
          <span className='text-green-500 hover:cursor-pointer' onClick={() => setForm(!form)}><i className="fa-regular fa-pen-to-square"></i></span>
          <span className='text-red-500 ml-3 hover:cursor-pointer' onClick={() => {handleDeleteChat(room.id)}}><i className="fa-solid fa-trash"></i></span>
        </div>
      </div>

      {form ? 
        <form 
          className='flex flex-row mt-1 mb-3'
          onSubmit={(e) => handleUpdateChat(e, room.id)}
        >
          <input 
            className='text-black'
            type="text"
            onChange={(e) => {setUpdateChat(e.target.value)}}
            value={updateChat}
          />
          <button className='bg-green-500 p-2' type="submit">Enter</button>
        </form>
        : 
        <>
        </>
      }
    </div>
  )
}