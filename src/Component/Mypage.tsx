import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { rootURL } from "../Constants";
import LoginStore, { LoginInfoDO } from "../Stores/LoginStore";
import MenuBar from "./MenuBar";
import crypto from 'crypto';
class UserInfo{
    constructor(
    id:string,
    username:string,
    token:string
){}}
export default function MyPage() {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [userInfo,setUserInfo]=useState<UserInfo>(new UserInfo("","",""));
  const deleteId = async () => {
    
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
         <h3> 내 정보</h3>
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
        {localStorage.getItem("userid")}
        <div
          style={{
            fontFamily: "Hi Melody",
            fontSize: "1.5rem",
            width: "20rem",
            marginTop: "1rem",
          }}
        >
          닉네임
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
          생년월일
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
          접근가능한 앨범
        </div>
        <TextField
          margin="dense"
          type="password"
          fullWidth
          onChange={changePasswd}
        />
        <div
            style={{ display:"flex",justifyContent:"right"}}>
          <Button onClick={deleteId} style={{ fontFamily: "Yeon Sung", border:"1px solid black", width:"100%", marginTop:"1rem" }}>
            계정탈퇴
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
