import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const SendMessage = ({ scroll,recipientId }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisable] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    setDisable(true)
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"),{
      recipientId,
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
    setDisable(false)
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setDisable(true)
      sendMessage();
    }
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <TextField
      label="Give a message"
      variant="outlined"
      fullWidth
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      sx={{ marginRight: 2 }}
      disabled={disabled} 
    />
    <Button disabled={disabled} variant="contained" color="primary" onClick={sendMessage}  endIcon={<SendIcon />}>
      Send
    </Button>
  </Box>
  );
};

export default SendMessage;
