import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from 'axios'; //This is for connecting to the server

function CreateArea(props) {

  const [isExpanded,setIsExpanded] = useState(false);
  //This isExpanded is only set when textArea got clicked

  //create a object that content both title and content
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target; //Destructuring

    setNote((prevNote) => {
      return {
        ...prevNote, //spread operator that's content previous value
        [name]: value //this syntax simply turns this name key from just
        // the string name for the key  to the actual value of this name constant
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note); //This onAdd method call App.jsx onAdd function
    //and sending CreateArea's note object

    axios.post('http://localhost:3001/add',{
      title: note.title,
      content: note.content
    })
    .then(result => console.log(result))
    .catch(err => console.log(err)) // if any error occur

    setNote({
      //this is for clear title and content after adding element
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function Expand(){
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />}
        <textarea
          name="content"
          onClick={Expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        
      {/* zoom is metarial-ui api and in={true} is a props */}
      <Zoom in ={isExpanded ? true : false}> 
        <Fab onClick={submitNote}>  {/* Fab is floating action button from metarial-ui */}
          <AddIcon />
        </Fab>
      </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
