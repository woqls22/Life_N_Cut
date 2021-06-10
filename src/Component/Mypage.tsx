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
export class AlbumDO {
    id: string;
    albumName: string;
    createdate: string;
    dday: string;
    description: string;
    ddayDescription: string;
    authorIdList: string[];
  constructor(
    id: string,
    albumName: string,
    createdate: string,
    dday: string,
    description: string,
    ddayDescription: string,
    authorIdList: string[]
  ) {
    this.id=id;
    this.albumName=albumName;
    this.createdate=createdate;
    this.dday=dday;
    this.description=description;
    this.ddayDescription=ddayDescription;
    this.authorIdList=authorIdList;
  }
}
export default function MyPage() {
  const [userEmailId, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [passwd, setPasswd] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>(new UserInfo("", "", ""));
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [AlbumInfo, setAlbumInfo] = useState<AlbumDO[]>([]);
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
        axios.get(rootURL + "/album/" + userId).then((res) => {
          setAlbumInfo(res.data.albumList as AlbumDO[]);});
      });
    }
  }, []);
  const setdeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };
  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const deleteId = async () => {
    if ("계정삭제" + userEmailId == deleteText) {
      let accessToken = localStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios.delete(rootURL + "/user/" + userEmailId).then((res) => {
        alert(res.data.email + "의 계정정보가 삭제되었습니다!");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userid");
        window.location.assign("/");
      });
      setOpenDeleteDialog(false);
    } else {
      alert("입력 문자열을 다시 확인해주세요!");
    }
  };
  const changeDeleteText = (e: any) => {
    setDeleteText(e.target.value);
  };
  return (
    <>
      {userEmailId.length > 0 ? (
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
              <h3> 내 정보</h3>
            </div>
            <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "1.5rem",
                width: "20rem",
              }}
            >
              <strong>아이디</strong>
            </div>
            <p
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
            </p>
            {/* <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "1.5rem",
                width: "20rem",
              }}
            >
               <strong>나의 Private Album</strong>
            </div>
            {AlbumInfo ?<>
              <div className={"myalbumcardcontainer"}>
              {AlbumInfo.map((item: AlbumDO) => {
                return (
                  <>
                    <div className="btngroup">
                      <div className="item">
                       <div><strong>{item.albumName}</strong></div> 
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            </>:<></>} */}
            
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                onClick={setdeleteDialogOpen}
                style={{
                  fontFamily: "Yeon Sung",
                  border: "1px solid black",
                  width: "100%",
                  marginTop: "1rem",
                  marginBottom:"1rem"
                }}
              >
                계정탈퇴
              </Button>
            </div>
            {/* <div
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
            <Button
              style={{ fontFamily: "Yeon Sung" }}
              onClick={() => {
                window.location.assign("/signup");
              }}
            >
              회원가입
            </Button>
          </div>
        </div> */}
          </div>
          {/* {GoogleButton()} */}
          <Dialog open={openDeleteDialog}>
            <DialogTitle
              style={{
                fontFamily: "Cafe24SsurroundAir",
                fontSize: "1.5rem",
              }}
            >
              계정 탈퇴
            </DialogTitle>
            <DialogContent
              style={{
                fontFamily: "Cafe24SsurroundAir",
                fontSize: "0.8rem",
              }}
            >
              <>
                정말 탈퇴하시겠습니까? <br />
                탈퇴 시 모든 회원정보는 삭제되며, 인생N컷 서비스를 이용하실 수
                없습니다.
                <div
                  style={{
                    fontFamily: "Cafe24SsurroundAir",
                    fontSize: "1rem",
                    marginTop: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  계정 삭제를 위해{" "}
                  <strong style={{ color: "blue" }}>
                    {"계정삭제" + userEmailId}
                  </strong>
                  를 입력해주세요
                </div>
                <TextField onChange={changeDeleteText} fullWidth={true} />
              </>
            </DialogContent>
            <DialogActions>
              <Button onClick={deleteId}>확인</Button>
              <Button onClick={closeDeleteDialog}>취소</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
