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
  // const marker = new naver.maps.Marker({
  //   position: new naver.maps.LatLng(37.4867995957995, 126.982211871752),
  //   map: map,
  //   icon: {
  //     content: `
  //         <img alt="marker" src="원하는 마커 이미지" />
  //       `,
  //   },
  // });
  export const Map = () => {
    useEffect(() => {
      let map = null;
      const initMap = () => {
        const map = new naver.maps.Map("map", {
          center: new naver.maps.LatLng(37.3595704, 127.105399),
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: true,
          minZoom: 6,
          zoomControlOptions: { //줌 컨트롤의 옵션
            position: naver.maps.Position.TOP_RIGHT
        }
        });}
      initMap();
    }, []);
  //지도 사이즈 관련 스타일
  const mapStyle = {
    width: "100%",
    height: "300px",
  };
  return (
    <>
    <React.Fragment>
      <div id="map" style={mapStyle}></div>
    </React.Fragment>
    </>
  );
};
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
                <Map/>
              </div>
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
  