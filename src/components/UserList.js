import { db,auth } from "../firebase";
import React, { useState, useEffect } from 'react';
import ChatBox from "./ChatBox";
import { Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function UserList() {
  const [users, setUsers] = useState([]);
  const user = getAuth().currentUser;
  const [recipientUser, setRecipientUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      if(!recipientUser){
        const q = query(collection(db, "users"), where("uid", "!=", user.uid));
        const docs = (await getDocs(q)).docs;
        const usersList = docs.map(doc => doc.data());
        setUsers(usersList);
      }
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  return (
    <>
    {recipientUser?
    <ChatBox recipUser={recipientUser}/>:
     <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
            Choose Chat Partner
        </Typography>
      <List>
        {users.map(recipient =>(
          <ListItem key={recipient.uid} button 
          onClick={()=>setRecipientUser(recipient)}
          sx={{
            '&:hover': {
              backgroundColor: '#f0f0f0', // Background color on hover
              cursor: 'pointer', // Change cursor to pointer on hover
            },
            '&.Mui-selected': {
              backgroundColor: '#e0e0e0', // Background color when selected
            },
          }}
          >
            <ListItemAvatar>
              <Avatar src={recipient.avatar}>
                {recipient.name ? recipient.name.charAt(0).toUpperCase() : ''}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={
                <Typography component="span" variant="body1" sx={{fontSize:16, fontWeight: 'bold' , marginRight: 1}}>
                    {recipient.name}
                </Typography>} 
                secondary={
                    <Typography component="span" variant="body2">
                    ({recipient.email})
                  </Typography>  
                }
                sx={{ whiteSpace: 'pre-line' }} 
                />
          </ListItem>
        ))}
      </List>
     </Paper>}
    </>
  );
}

export default UserList;