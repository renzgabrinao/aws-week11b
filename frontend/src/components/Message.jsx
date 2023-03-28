import { useState } from "react";
import axios from 'axios';

export default function Message({msg, currentChat, setMessages}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [updateMessage, setUpdateMessage] = useState("");
  const [form, setForm] = useState(false);

  const handleDeleteMessage = (id) => {
    axios.delete(apiUrl + "/messages/" + `${currentChat}/${id}`)
    .then(res => setMessages(res.data.messages));
  }

  const handleUpdateMessage = (e) => {
    e.preventDefault();

    axios.put(`${apiUrl}/messages/${currentChat}/${msg.id}`, {
      content: updateMessage
    })
    .then(res => setMessages(res.data.messages))

    setUpdateMessage("");
    setForm(false);
  }
  return (
    <div>
      <p>{msg.content}
        <span className='text-green-500 hover:cursor-pointer' onClick={() => setForm(!form)}>
          <i className="fa-regular fa-pen-to-square"></i>
        </span>
        <span className='text-red-500 hover:cursor-pointer' onClick={() => {handleDeleteMessage(msg.id)}}>
          <i className="fa-solid fa-trash"></i>
        </span>
      </p>
      {form ? 
        <form onSubmit={(e) => handleUpdateMessage(e, msg.id)}>
          <input 
            className='text-black'
            type="text"
            onChange={(e) => {setUpdateMessage(e.target.value)}}
            value={updateMessage}
          />
          <button type="submit">Enter</button>
        </form>
        : 
        <>
        </>
      }

    </div>
  )
}