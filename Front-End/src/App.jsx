import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateArea from "./components/CreateArea";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';


function App() {
  const [notes, setNotes] = useState([]); // create an array notes to save all note

  //here useEffect is used to get data from mongoose compass 
  //so that if we refresh the page, previous data came
  useEffect(() => {
    axios.get('http://localhost:3001/get')
    .then(result => setNotes(result.data))
    .catch(err => console.log(err))
  },[])

  function addNote(note) {
    // This note came from CreateArea.jsx props section
    setNotes((prevNotes) => {
      return [...prevNotes, note]; //using spread operator
    });
  }

  //deleteNote use to send the data to localhost
  const deleteNote = (id) => {
    axios.delete('http://localhost:3001/delete/'+id)
    .then(result => {
      location.reload()
    })
    .catch(err => console.log(err))
  }


  return (
    <div>
      <Header />

      <CreateArea onAdd={addNote}/>
      {/*  We need function that can trigger CreateArea.jsx's note object and 
           back over to the App.jsx. So addNote function is created*/}

      {notes.map(noteItem => {
        return (
          <div className="note">
            <h1>{noteItem.title}</h1>
            <p>{noteItem.content}</p>
            <button onClick={() => deleteNote(noteItem._id)}>
              <DeleteIcon />
            </button>
        </div>
        );
      })}
      {/* Iterate through notes and for each item we return 
      an object with it's title and content */}

      <Footer />
    </div>
  );
}

export default App;
