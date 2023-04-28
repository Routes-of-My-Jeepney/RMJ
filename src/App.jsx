import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Map from './map.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [posts, setPosts] = useState([]);

  useEffect(() => {
     fetch('https://maps.googleapis.com/maps/api/directions/json?destination=GCG2%2B3M%20Kolkata%20India&origin=H8MW%2BWP%20Kolkata%20India&key=AIzaSyBfizejlk9RrRv3_O_44iBeZlcz93LzHUw')
        .then((res) => res.json())
        .then((data) => {
           console.log(data);
           setPosts(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Map />
    </>
  )
}

export default App
