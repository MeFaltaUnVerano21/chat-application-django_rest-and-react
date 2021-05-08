import { w3cwebsocket as W3CWebsocket } from 'websocket';
import React from 'react';
import { Grid, Button, TextField, Typography, Paper, Card } from '@material-ui/core';
function Home() {
  
  const [ room, setrom ] = React.useState('vacad');
  const [ logged, setlogged ] = React.useState(false);
  const [ name, setname ] = React.useState('guest');
  const [ channel, setchannel ] = React.useState('world');
  const [ messages, setmessages ] = React.useState([])

  const client = new W3CWebsocket('ws://127.0.0.1:8000/ws/chat/' + room + '/')

  React.useEffect(()=>{
    client.onopen = () =>{
      console.log('WebSocket Client Connected')
    }
  })

  function register(){
    return(<Grid  container spacing={3}>
    <Grid item xs={12} align="center">
      <Typography variant="h3" component="h3">
        Chat Rooms
      </Typography>
    </Grid>
    <Grid item xs={12} align="center">
      <TextField defaultValue={channel} variant="outlined" label="User Name" type="text" required={true} inputProps={{min: 1}}
      onChange={(e)=> setchannel(e.target.value)}/>
    </Grid>
    <Grid item xs={12} align="center">
      <TextField defaultValue={name} variant="outlined" label="Chat Name" required={true} onChange={(e)=> setname(e.target.value)}/>
    </Grid>
    <Grid item xs={12} align="center">
      <Button variant="contained" color="primary" size="large" onClick={(e)=> setlogged(true)}>
        Join
      </Button>
    </Grid>
  </Grid>)
  }

  function chat(){
    return(
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography>
          <Paper style={{height: 500, maxHeight: 500, overflow: 'auto', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {messages.map(message=>{
              <Card>
                title={message.name}
                subheader={message.msg}
              </Card>
            })}
          </Paper>
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary">
          Send
        </Button>
      </Grid>
      
    </Grid>
    )
  }

  return (
    <div style={{marginTop: "10%"}}>
    {logged ? chat() : register()}
    </div>

  );
}

export default Home;
