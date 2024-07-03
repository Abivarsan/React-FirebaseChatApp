import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Box, Grid, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import { format } from "date-fns";

const Message = ({ index,message }) => {
  const [user] = useAuthState(auth);
  console.log({message});
  const isCurrentUser = message.uid === user.uid;
  return (
    message?
    <ListItem  key={index} sx={{ justifyContent: isCurrentUser ? 'flex-end' : 'flex-start' }}>
      <Paper sx={{ padding: 1.5, borderRadius: 2, backgroundColor:isCurrentUser ? '#dcf8c6' : '#f1f0f0' }}>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center' ,marginBottom: 1,flexDirection: isCurrentUser ? 'row-reverse' : 'row',}}>
              <Avatar
                src={message.avatar}
                sx={{
                  marginRight: 1,
                  width: 32,
                  height: 32,
                }}
              >
                {message.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' , marginRight: 1}}>
                {message.name}
              </Typography>
            </Box>
          }
          secondary={
            <Grid container direction="column" spacing={0}>
              <Grid item>
                <Typography component="span" variant="body2">
                  {message.text}
                </Typography>
              </Grid>
              <Grid item sx={{ alignSelf: 'flex-end' }}>
                <Typography
                  component="span"
                  variant="caption"
                  color="textSecondary"
                  sx={{
                    fontSize: '0.70em',
                    textAlign: 'right',
                  }}
                >
                  {message.createdAt?format(new Date(message.createdAt.seconds * 1000), 'MMM dd, yyyy - hh:mm a'):''}
                </Typography>
              </Grid>
            </Grid>
          }
          sx={{ whiteSpace: 'pre-line' }} // Preserve newlines in message text
        />
      </Paper>
    </ListItem>:<></>
  );
};

export default Message;
