import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import {Box, List, Paper, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";

const ChatBox = ({recipUser}) => {
  const [messages, setMessages] = useState([]);
  const [recipientUser, setRecipientUser] = useState({});
  const scroll = useRef();
  const user=getAuth().currentUser

  useEffect(() => {
    init();
  }, []);
  const init=async ()=>{
    await setRecipientUser(recipUser)
    const userid=user.uid;
    const recipid=recipUser.uid;
    const q = await query(
      collection(db, "messages"),
      where('uid','in',[userid,recipid])
    );
    onSnapshot(q, async (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      if(sortedMessages){
        const userlist=sortedMessages.filter(masg=>(masg.recipientId==userid&& masg.uid==recipid)||(masg.recipientId==recipid && masg.uid==userid));
        console.log({userlist});
        setMessages(userlist);
      }
    });
  }
  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', marginTop: 2, backgroundColor: '#f1f1f1' }}>
      <Typography variant="h5" gutterBottom>
        Chat with <strong>{recipientUser.name || '...'}</strong>
      </Typography>
      <Box sx={{ maxHeight: '480px', overflowY: 'auto', marginBottom: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <Message index={index} message={msg}/>
          ))}
          <span ref={scroll}></span>
        </List>
      </Box>
      <SendMessage scroll={scroll} recipientId={recipientUser.uid}/>
    </Paper>
  );
};

export default ChatBox;
