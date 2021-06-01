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
import LoginStore, { LoginInfoDO } from "./Stores/LoginStore";
import { useObserver } from "mobx-react";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
export function GoogleButton() {
  const onSuccess = async (response: any) => {
    let id = response.Ft.pu;
    let userName = response.Ft.Ue;
    await axios
      .post(
        "http://localhost:8090/login",
        JSON.stringify({ id: id, userName: userName })
      )
      .then(() => {
        LoginStore.setLoginInfo(new LoginInfoDO(id, userName));
        LoginStore.setLoginDialogVariable(false);
        LoginStore.setIsLoggedIn(true);
        console.log(LoginStore.loginInfo);
        alert(LoginStore.loginInfo.userName + "님 반갑습니다.");
      })
      .catch(() => {
        alert("로그인 오류!");
      });
  };
  const onFailure = (error: any) => {
    console.log(error);
  };
  return (
    <div>
      <GoogleLogin
        clientId={
          "554658937314-jvkci3tbp8s7og20nal6iaf42lqb7qs0.apps.googleusercontent.com"
        }
        responseType={"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}
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
  const responseGoogle = (response: any) => {
    console.log(response);
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
              로그인
            </div>
          </DialogTitle>
          <DialogContent>
            {/* <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "1.5rem",
                width: "20rem",
              }}
            >
              아이디
            </div>
            <TextField margin="dense" fullWidth onChange={changeId} />
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
            /> */}
            <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "1.1rem",
                width: "20rem",
                marginBottom: "1rem",
              }}
            >
              구글 계정으로 회원가입 없이 로그인 하세요! 
            </div>
            {GoogleButton()}
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
