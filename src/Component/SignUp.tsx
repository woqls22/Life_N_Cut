import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { rootURL } from "../Constants";
import LoginStore, { LoginInfoDO } from "../Stores/LoginStore";
import MenuBar from "./MenuBar";
import crypto from "crypto";
export default function SignUp() {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");
  const postLoginInfo = async () => {
    if(id.length<5){
      alert("ID는 최소 5자 이상이어야 합니다.");
      return;
    }
    const data = {
      id: id,
      passwd: passwd,
      nickname: nickname,
      birthday: birthday,
    };
    const headerconfig: any = {
      headers: { "Content-Type": "application/json" },
    };
    await axios
      .post(
        rootURL + "/signup",
        JSON.stringify({
          email: id,
          password: crypto
            .createHash("sha512")
            .update(passwd)
            .digest("base64")
            .toString(),
          auth: "ROLE_USER",
          nickname: nickname,
          birthday: birthday,
        }),
        headerconfig
      )
      .then((res) => {
        console.log(res);
        LoginStore.setLoginInfo(new LoginInfoDO(id));
        LoginStore.setLoginDialogVariable(false);
        LoginStore.setIsLoggedIn(true);
        console.log(LoginStore.loginInfo);
        alert("회원가입이 완료되었습니다. 가입한 정보로 로그인해주세요.");
        window.location.assign("/login");
      })
      .catch(() => {
        alert("아이디가 중복됩니다. 다른 아이디를 사용하세요");
      });
  };
  const changeId = (e: any) => {
    setId(e.target.value);
  };
  const changePasswd = (e: any) => {
    setPasswd(e.target.value);
  };
  const changeNickName = (e: any) => {
    setNickname(e.target.value);
  };
  const changeBirthday = (e: any) => {
    setBirthday(e.target.value);
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
            fontFamily: "Cafe24SsurroundAir",
            fontSize: "2rem",
            width: "20rem",
            marginBottom: "1rem",
            marginTop: "5rem",
          }}
        >
          <h3> 회원가입</h3>
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
          style={{
            fontFamily: "Hi Melody",
            fontSize: "1.5rem",
            width: "20rem",
            marginTop: "1rem",
          }}
        >
          이름(닉네임)
        </div>
        <TextField
          margin="dense"
          type="text"
          fullWidth
          onChange={changeNickName}
        />
        <div
          style={{
            fontFamily: "Hi Melody",
            fontSize: "1.5rem",
            width: "20rem",
            marginTop: "1rem",
          }}
        >
          생년월일
        </div>
        <TextField
          margin="dense"
          type="month"
          fullWidth
          onChange={changeBirthday}
        />
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            onClick={postLoginInfo}
            style={{
              fontFamily: "Yeon Sung",
              border: "1px solid black",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            회원가입하기
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
        </div>
      </div>
    </>
  );
}
