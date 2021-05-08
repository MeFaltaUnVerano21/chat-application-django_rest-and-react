import { w3cwebsocket as W3CWebsocket } from 'websocket';
import React from 'react';
import { Grid, Button, TextField, Typography, Paper, Card, CardHeader, Avatar } from '@material-ui/core';
function Home() {
  
  const [ room, setrom ] = React.useState('world');
  const [ logged, setlogged ] = React.useState(false);
  const [ name, setname ] = React.useState('guest');
  const [ messages, setmessages ] = React.useState([])
  const [ value, setvalue ] = React.useState('message');
  const client = React.useRef(null); 

  function connect(){
    client.current = new W3CWebsocket('ws://127.0.0.1:8000/ws/chat/' + room + '/')

  }

  function onOpen(e){

    console.log('WebSocket Client Connected')
  }

  function onMessage(message){
    const dataFromServer = JSON.parse(message.data);
    console.log('got reply!', dataFromServer.type);
    if (dataFromServer){
      setmessages((prev) => [...prev, {
        msg: dataFromServer.message,
        name: dataFromServer.name
      }]);
    }
    console.log(messages)
  }

  React.useEffect(()=>{
    connect()

    client.current.onopen = onOpen;

    client.current.onmessage = onMessage;
    
  }, []);

  function onButtonClicked(e){
    client.current.send(JSON.stringify({
      type: 'message',
      message: value,
      name: name,
    }));
    setvalue('message');
    e.preventDefault();
  }

  function register(){
    return(<Grid  container spacing={3}>
    <Grid item xs={12} align="center">
      <Typography variant="h3" component="h3">
        Chat Rooms
      </Typography>
    </Grid>
    <Grid item xs={12} align="center">
      <TextField defaultValue={name} variant="outlined" label="User Name" type="text" required={true} inputProps={{min: 1}}
      onChange={(e)=> setname(e.target.value)}/>
    </Grid>
    <Grid item xs={12} align="center">
      <TextField defaultValue={room} variant="outlined" label="Chat Name" required={true} onChange={(e)=> setroom(e.target.value)}/>
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
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Room {room}
          </Typography>
      </Grid>
      <Grid item xs={12} align="center">
          <Paper variant="outlined" square style={{height: 500, maxHeight: 500, boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {messages.map((message => {
              return(
              <Card style={{boxShadow: 'none'}}>
                <CardHeader 
                avatar= {
                  <Avatar/>
                }
                title={message.name} 
                subheader={message.msg}/>
              </Card>)
            }))}
          </Paper>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField variant="outlined" value={value} required="true" inputProps={{min: 1}} defaultValue={value} onChange={(e) => setvalue(e.target.value)}>
          
        </TextField>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={(e) => onButtonClicked(e)}>
          Send
        </Button>
      </Grid>
      
    </Grid>
    )
  }

  return (
    <div>
    {logged ? chat() : register()}
    </div>

  );
}

export default Home;
