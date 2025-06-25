import './app.css';
import { useState, useEffect } from 'react';
import { getHelloMessage } from './api/clothingApi'; 

function App() {
  const [count, setCount] = useState("");

  useEffect(() => {
    getHelloMessage()
      .then((data) => {
        setCount(data.message);
      })
      .catch((error) => {
        console.error('Error fetching hello message:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vite + React</h1>
        <p>
         The count is: {count}
        </p>
      </header>
    </div>
  );
}

export default App;