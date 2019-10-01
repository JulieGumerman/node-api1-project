import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from "axios"
import './App.css';

function App() {
  const [hobbits, setHobbits] = useState([]);
  const [newHobbit, setNewHobbit] = useState({name: "", bio: ""})

  const retrieveHobbits = () => {
      axios.get("http://localhost:8000/data/")
        .then(res => setHobbits(res.data))
        .catch(err => console.log(err))
  }

  useEffect(() => {
    retrieveHobbits();
  }, []);

  const handleHobbit = e => {
    const {name, value} = e.target;
    setNewHobbit({...newHobbit, [name]: value })
  }

  const addHobbit = (e, ickleHobbit) => {
    e.preventDefault();
    axios.post("http://localhost:8000/data/", ickleHobbit)
      .then(res => {
        console.log("I worked!!!");
        retrieveHobbits();
        console.log("hobbits", hobbits);
    });
  }

  const deleteHobbit = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:8000/data/${id}`)
      .then(res => console.log(res));
  }

  return (
    <div className="App">
    <h1>We love hobbits!</h1>
    <form onSubmit={(e) => addHobbit(e, newHobbit)}>
      <h2>Add a hobbit</h2>
      <input 
        name="name"
        value={newHobbit.name}
        onChange={handleHobbit}
        />
      <input 
      name="bio"
      value={newHobbit.bio}
      onChange={handleHobbit}
      />
      <button>Add!</button>
    </form>
    {hobbits.map(hobbit => {
      return (
        <div>
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
