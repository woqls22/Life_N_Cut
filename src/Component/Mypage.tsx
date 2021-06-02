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
class UserInfo {
  constructor(id: string, username: string, token: string) {}
}
export default function MyPage() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [passwd, setPasswd] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>(new UserInfo("", "", ""));
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      let userId = localStorage.getItem("userid");
      let accessToken = localStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios.get(rootURL + "/user/" + userId).then((res) => {
        setId(res.data.email);
        setNickname(res.data.nickname);
        setBirthday(res.data.birthday);
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
    if("계정삭제" + id==deleteText){
      let accessToken = localStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios.delete(rootURL + "/user/" + id).then((res) => {
        alert(res.data.email + "의 계정정보가 삭제되었습니다!");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userid");
        window.location.assign("/");
      });
      setOpenDeleteDialog(false);
    }else{
      alert("입력 문자열을 다시 확인해주세요!")
    }
  };
  const changeDeleteText = (e: any) => {
    setDeleteText(e.target.value);
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
        <p
          style={{
            fontFamily: "Hi Melody",
            fontSize: "1.3rem",
          }}
        >
          {id}
        </p>
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
          생년월일
        </div>
        <p
          style={{
            fontFamily: "Hi Melody",
            fontSize: "1.3rem",
          }}
        >
          {birthday.length?<>{birthday}</>:<>정보없음</>}
        </p>
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

        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            onClick={setdeleteDialogOpen}
            style={{
              fontFamily: "Yeon Sung",
              border: "1px solid black",
              width: "100%",
              marginTop: "1rem",
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
          정말 탈퇴하시겠습니까? <br/>탈퇴 시 모든 회원정보는 삭제되며, 인생N컷 서비스를 이용하실 수 없습니다.
          <div
            style={{
              fontFamily: "Cafe24SsurroundAir",
              fontSize: "1rem",
              marginTop: "1rem",
              marginBottom:"2rem"
            }}
          >
            계정 삭제를 위해 <strong style={{color:"blue"}}>{"계정삭제" + id}</strong>를 입력해주세요
          </div>
         <TextField
          onChange={changeDeleteText}
          fullWidth={true}
          />
            </>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteId}>확인</Button>
          <Button onClick={closeDeleteDialog}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
