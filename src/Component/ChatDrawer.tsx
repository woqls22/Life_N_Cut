import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
export type message = {
  username: string;
  content: string;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 180,
    },
    container: {
      display: 'flex',
    },
    paper: {
      margin: theme.spacing(1),
    },
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
  }),
);
export default function ChatDrawer() {
 
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [text,setText] = useState("");
 
  const handleTextChange=(e:any)=>{
    setText(e.target.value);
  }
  const sendMsg=()=>{
    //send Text
    setText("");
  }
  const onKeyPress=(e:any)=>{
    if(e.key == 'Enter') {
      sendMsg();
    }
  }
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <div className={classes.root} style={{textShadow:"white -1px 0px 8px"}}>
      <div className={classes.container}>
        <Fade in={checked}>
          <Paper elevation={4} className={classes.paper} style={{height:350, width:350}}>
           <div style={{width:"90%", marginLeft:"auto", marginRight:"auto", marginTop:"5px"}}>앨범 제목</div>
           <div style={{width:"90%", border:"1px solid lightgrey", marginLeft:"auto", marginRight:"auto", height:"75%", marginTop:"10px"}}>채팅 내용</div>
           <div style={{width:"90%", marginLeft:"auto", marginRight:"auto", marginTop:"5px", display:"flex"}}>
            <div style={{flex:4,  border:"1px solid lightgrey", marginRight:"10px"}}>
            <TextField value = {text} style={{width:"100%"}} onChange={handleTextChange} onKeyPress={onKeyPress}></TextField>

            </div>
            <div style={{flex:1,  border:"1px solid lightgrey"}}><Button size="small" onClick={sendMsg} >전송</Button></div>
           </div>
          </Paper>
        </Fade>
      </div>
      <FormControlLabel
        control={<Switch  checked={checked} onChange={handleChange} />}
        style={{marginLeft:"auto"}}
        className="chatTitle"
        label=""
      />채팅하기
    </div>
  );
}