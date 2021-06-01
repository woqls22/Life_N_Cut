import logo from "./logo.svg";
import "./App.css";
import HomeComponent from "./Component/HomeComponent";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
import LoginStore from "./Stores/LoginStore";
import { useObserver } from "mobx-react";
import { useState } from "react";
const LoginDialog = () => {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const postLoginInfo = () => {
    console.log(id, passwd);
    LoginStore.setLoginDialogVariable(false);
  };
  const closeLoginDialog = () => {
    LoginStore.setLoginDialogVariable(false);
  };

  const changeId = (e: any) => {
    setId(e.target.value);
  };
  const changePasswd = (e: any) => {
    setPasswd(e.target.value);
  };
  return useObserver(() => {
    return (
      <>
        <Dialog open={LoginStore.openLoginDialog}>
          <DialogTitle>
          <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "2rem",
                width: "20rem",
              }}
            >
              Login
            </div>
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "1.5rem",
                width: "20rem",
              }}
            >
              아이디
            </div>
            <TextField
              margin="dense"
              fullWidth
              onChange={changeId}
            />
            <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "1.5rem",
                width: "20rem",
                marginTop: "1rem",
              }}
            >
              비밀번호
            </div>
            <TextField
              margin="dense"
              type="password"
              fullWidth
              onChange={changePasswd}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={postLoginInfo}>확인</Button>
            <Button onClick={closeLoginDialog}>취소</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  });
};
function App() {
  return useObserver(() => {
    return (
      <div className="App">
        <HomeComponent />
        <LoginDialog />
      </div>
    );
  });
}

export default App;
