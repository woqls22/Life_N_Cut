import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import { UserInfo } from "os";
import React, { useEffect, useState } from "react";
import { rootURL } from "../Constants";
import MenuBar from "./MenuBar";
export class AlbumInfo {
  constructor(
    public id: string,
    public albumName: string,
    public authorIdList: string[],
    public files: any[]
  ) {}
}
export default function PhotoMain() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [createDialog, setCreateDialog] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const [accessToken_usr, setAccessToken_usr] = useState("");
  const [albumInfoList, setAlbumInfoList] = useState<any[]>([]);
  const openCreateAlbumDialog = () => {
    setCreateDialog(true);
  };
  const closeCreateAlbumDialog = () => {
    setCreateDialog(false);
  };
  const changeAlbumName = (e: any) => {
    setAlbumName(e.target.value);
  };
  const postCreateAlbum = () => {
    let accessToken = localStorage.getItem("accessToken");
    let userId = localStorage.getItem("userid");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    axios.post(rootURL + "/album/" + userId + "/" + albumName).then((res) => {
      alert("앨범 등록이 완료되었습니다!");
      window.location.assign("/photo/main");
    });
  };
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      let userId = localStorage.getItem("userid");
      let accessToken = localStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios.get(rootURL + "/user/" + userId).then((res) => {
        setId(res.data.email);
        setNickname(res.data.nickname);
        if (res.data.birthday) {
          setBirthday(res.data.birthday);
        }
      });
      axios.get(rootURL + "/album/" + userId).then((res) => {
        setAlbumInfoList(res.data as AlbumInfo[]);
      });
    }
  }, []);
  return (
    <>
      <MenuBar />
      <div
        style={{
          width: "20rem",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            fontFamily: "Cafe24SsurroundAir",
            fontSize: "2rem",
            width: "20rem",
            marginTop: "5rem",
          }}
        >
          <h3> ALBUM</h3>
        </div>
        <div
          style={{
            fontFamily: "Hi Melody",
            fontSize: "1.5rem",
            width: "20rem",
          }}
        >
          Private Album
        </div>
        <div
          style={{
            minHeight: "500px",
            border: "1px solid black",
            overflowY: "auto",
          }}
        >
          {albumInfoList.map((item: AlbumInfo) => {
            return (
              <>
                {item.albumName}
                <br />
              </>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            style={{
              fontFamily: "Yeon Sung",
              border: "1px solid black",
              width: "100%",
              marginTop: "1rem",
              fontSize: "1rem",
            }}
            onClick={openCreateAlbumDialog}
          >
            앨범 추가하기
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5%",
          }}
        ></div>
      </div>
      <Dialog open={createDialog}>
        <DialogTitle
          style={{
            fontFamily: "Cafe24SsurroundAir",
            fontSize: "1.5rem",
          }}
        >
          앨범 만들기
        </DialogTitle>
        <DialogContent
          style={{
            fontFamily: "Cafe24SsurroundAir",
            fontSize: "0.8rem",
          }}
        >
          <>
            앨범 이름을 적어주세요.
            <div
              style={{
                fontFamily: "Cafe24SsurroundAir",
                fontSize: "1rem",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            ></div>
            <TextField onChange={changeAlbumName} fullWidth={true} />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={postCreateAlbum}>확인</Button>
          <Button onClick={closeCreateAlbumDialog}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
