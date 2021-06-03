import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useObserver } from "mobx-react-lite";
import { FormControl } from "@material-ui/core";
import axios from "axios";
import AlbumStore from "../Stores/AlbumStore";
import { rootURL } from "../Constants";
import { ImgDO } from "./PhotoAlbum";
export default function InviteDialog() {
  const handleClose = () => {
    AlbumStore.openInviteDialog = false;
    setEmail("");

  };
  const [email, setEmail] = useState("");
  const postInvite = async () => {
    // Post Request
    const res = await axios.get(rootURL+"/invite/"+AlbumStore.clickedAlbum.id+"/"+email).then((res)=>{
        AlbumStore.openInviteDialog = false;
        alert("초대요청을 보냈습니다.");
    });
  };
  const changeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  return useObserver(() => {
    return (
      <div>
        <Dialog open={AlbumStore.openInviteDialog} onClose={handleClose}>
          <DialogTitle>
            <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "2rem",
                width: "20rem",
              }}
            >
              앨범 초대
            </div>
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "1.5rem",
                width: "20rem",
                marginTop: "1rem",
              }}
            >
              초대를 보낼 아이디를 입력하세요
            </div>
            <TextField
              margin="dense"
              fullWidth
              onChange={changeEmail}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={postInvite} color="primary">
              확인
            </Button>
            <Button onClick={handleClose} color="primary">
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  });
}