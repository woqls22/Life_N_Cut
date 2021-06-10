import {
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
  } from "@material-ui/core";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { rootURL } from "../Constants";
  import LoginStore, { LoginInfoDO } from "../Stores/LoginStore";
  import MenuBar from "./MenuBar";
  import crypto from "crypto";
  import "../styles/AlbumList.css";
  import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
  class UserInfo {
    constructor(id: string, username: string, token: string) {}
  }
  export default function PlaceMain() {
    const [userEmailId, setId] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [passwd, setPasswd] = useState("");
    const [userInfo, setUserInfo] = useState<UserInfo>(new UserInfo("", "", ""));
    useEffect(() => {
      if (localStorage.getItem("userid")) {
        let userId = localStorage.getItem("userid");
        let accessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        axios.get(rootURL + "/user/" + userId).then((res) => {
          console.log(res.data);
          setId(res.data.email);
          setNickname(res.data.nickname);
          if (res.data.birthday) {
            setBirthday(res.data.birthday);
          }
        });
      }
    }, []);
    return (
      <>
          <>
            <MenuBar />
            <div
              style={{
                width: "20rem",
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "47px",
              }}
            >
              <div
                style={{
                  fontFamily: "Cafe24SsurroundAir",
                  fontSize: "2rem",
                  width: "20rem",
                  marginTop:"2rem"
                }}
              >
                <h3>버킷 플레이스</h3>
              </div>
              <div
                style={{
                  fontFamily: "Hi Melody",
                  fontSize: "1.5rem",
                  width: "20rem",
                }}
              >
                <strong>지금은 공사중이에요. <br/>곧 서비스가 오픈됩니다!</strong>
              </div>
              {/* <p
                style={{
                  fontFamily: "Hi Melody",
                  fontSize: "1.3rem",
                }}
              >
                {userEmailId}
              </p>
              <div
                style={{
                  fontFamily: "Hi Melody",
                  fontSize: "1.5rem",
                  width: "20rem",
                  marginTop: "1rem",
                }}
              >
                <strong>닉네임</strong>
              </div>
              <p
                style={{
                  fontFamily: "Hi Melody",
                  fontSize: "1.3rem",
                }}
              >
                {nickname}
              </p>
              <div
                style={{
                  fontFamily: "Hi Melody",
                  fontSize: "1.5rem",
                  width: "20rem",
                  marginTop: "1rem",
                }}
              >
                 <strong>생년월일</strong>
              </div>
              <p
                style={{
                  fontFamily: "Hi Melody",
                  fontSize: "1.3rem",
                }}
              >
                {birthday.length ? <>{birthday}</> : <>정보없음</>}
              </p> */}
              <div style={{ display: "flex", justifyContent: "right" }}>
                <Button
                  style={{
                    fontFamily: "Yeon Sung",
                    border: "1px solid black",
                    width: "100%",
                    marginTop: "1rem",
                    marginBottom:"1rem"
                  }}
                  onClick={() => {
                    window.location.assign("/");
                  }}
                >
                  돌아가기
                </Button>
              </div>
            </div>
          </>
      </>
    );
  }
  