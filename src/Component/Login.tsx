import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import LoginStore, { LoginInfoDO } from "../Stores/LoginStore";
import { MenuBar } from "./HomeComponent";
export default function Login() {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const postLoginInfo = async () => {
    const data = {
      id: id,
      passwd: passwd,
    };
    axios
      .post("/login", data)
      .then((response) => {
        const { accessToken } = response.data;
        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        // accessToken을 localStorage, cookie 등에 저장하지 않는다!
      })
      .catch((error) => {
        // ... 에러 처리
      });
    await axios
      .post(
        "http://localhost:8090/login",
        JSON.stringify({ id: id, password: passwd })
      )
      .then((res) => {
        console.log(res);
        LoginStore.setLoginInfo(new LoginInfoDO(id));
        LoginStore.setLoginDialogVariable(false);
        LoginStore.setIsLoggedIn(true);
        console.log(LoginStore.loginInfo);
        alert(LoginStore.loginInfo.id + "님 반갑습니다.");
      })
      .catch(() => {
        alert("로그인 오류!");
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
          }}
        >
          로그인
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
            <Button style={{ fontFamily: "Yeon Sung" }}>회원가입</Button>
          </div>
        </div>
      </div>
      {/* {GoogleButton()} */}
    </>
  );
}
