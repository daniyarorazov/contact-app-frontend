import {useEffect, useState} from 'react';
import axios from '../node_modules/axios/index';
import './App.css';
import Swal from 'sweetalert2';

function App() {
    const [data, setData] = useState([]);

  useEffect(() => {
      axios.get('http://qosyl.me:3000/api/get-data/').then((response) => {
          setData(response.data);
      });
  }, []);

    const sendMessageHandler = (chat_id: string) => {
        const chatId = chat_id; // Замените на фактический chat_id
        // Выполните POST-запрос на сервер для отправки сообщения в Telegram бота
        fetch(`http://qosyl.me:3000/send-message?chat_id=${chatId}`, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                Swal.fire(
                    'Успешно!',
                    'Вы успешно отправили сообщение!',
                    'success'
                )
            })
            .catch((error) => {
                Swal.fire(
                    'Ошибка!',
                    'На стороне сервера произошла ошибка!',
                    'error'
                )
            });
    };

    return (
        <>
            <div className="App">
                {data.map((item) => (
                    <div className="card-block" key={item.id}>
                        <h1>{item.name} {item.surname}</h1>
                        <p>{item.speciality}</p>
                        <button onClick={() => sendMessageHandler(item.chat_id)}>Send message to {item.name}</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
