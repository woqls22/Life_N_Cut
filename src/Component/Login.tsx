import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { rootURL } from "../Constants";
import LoginStore, { LoginInfoDO } from "../Stores/LoginStore";
import MenuBar from "./MenuBar";
export default function Login() {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const postLoginInfo = async () => {
    const data = {
      id: id,
      passwd: passwd,
    };
    const headerconfig:any={
      headers: { "Content-Type": "application/json" },
  }
    await axios
      .post(
        rootURL+"/authenticate",
        JSON.stringify({ username: id, password: passwd }),
        headerconfig
      )
      .then((res) => {
        console.log(res);
        LoginStore.setLoginInfo(new LoginInfoDO(id));
        LoginStore.setLoginDialogVariable(false);
        LoginStore.setIsLoggedIn(true);
        console.log(LoginStore.loginInfo);
        alert(LoginStore.loginInfo.id + "님 반갑습니다.");
        const { accessToken } = res.data;
        localStorage.setItem("userInfo",JSON.stringify({
            id : id,
            username : LoginStore.loginInfo.id,
            token : accessToken
          })
        );
        window.location.assign("/");
      })
      .catch(() => {
        alert("로그인실패! 아이디와 비밀번호를 다시 확인해주세요");
      });
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
  return (
    <>
      <MenuBar />
      <div
        style={{
          width: "20rem",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10%",
        }}
      >
        <div
          style={{
            fontFamily: "Hi Melody",
            fontSize: "2rem",
            width: "20rem",
            marginBottom: "1rem",
            marginTop:"5rem"
          }}
        >
         <h3> 로그인</h3>
        </div>
        <div
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
        />
        <div
            style={{ display:"flex",justifyContent:"right"}}>
          <Button onClick={postLoginInfo} style={{ fontFamily: "Yeon Sung", border:"1px solid black", width:"100%", marginTop:"1rem" }}>
            로그인
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5%",
          }}
        >
          <div style={{ marginRight: "2%" }}>
            <Button style={{ fontFamily: "Yeon Sung" }}>아이디 찾기 </Button>
          </div>
          <div style={{ marginRight: "2%" }}>
            <Button style={{ fontFamily: "Yeon Sung" }}>비밀번호 찾기</Button>
          </div>
          <div>
            <Button style={{ fontFamily: "Yeon Sung" }} onClick={()=>{window.location.assign("/signup")}}>회원가입</Button>
          </div>
        </div>
      </div>
      {/* {GoogleButton()} */}
    </>
  );
}
