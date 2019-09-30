import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from "axios"
import './App.css';

function App() {
  const [hobbits, setHobbits] = useState([]);

  const retrieveHobbits = () => {
          axios
        .get("http://localhost:8000/data/")
        .then(res => {
          setHobbits(res.data)
          console.log(res.data);
        
        })
        .catch(err => console.log(err))
  }

  useEffect(() => {
    retrieveHobbits();
  }, [])

  // const deleteHobbit = (id, e) => {
  //   e.preventDefault();
  //   axios.delete(`http://localhost:8000/data/${id}`)
  //     .then(res => console.log(res));
  // }


  console.log("hobbits", hobbits);
  return (
    <div className="App">
    <h1>We love hobbits!</h1>
    {hobbits.map(hobbit => {
      return (
        <div key={hobbit.id}>
          <h3>{hobbit.name}</h3>
          <p>{hobbit.bio}</p>
          <button>X</button>
        </div>
      );
    })}
    </div>
  );
}

export default App;
