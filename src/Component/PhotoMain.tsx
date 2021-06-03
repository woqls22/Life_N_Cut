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
import "../styles/AlbumList.css";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import AlbumStore from "../Stores/AlbumStore";
import { AlbumDO } from "./Mypage";
import { useObserver } from "mobx-react-lite";
import PhotoAlbum from "./PhotoAlbum";
import PhotoPostDialog from "./PhotoPostDialog";
import InviteDialog from "./InviteDialog";
function deleteAlbum(id: string) {
  let accessToken = localStorage.getItem("accessToken");
  let userId = localStorage.getItem("userid");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios.delete(rootURL + "/album/" + id).then((res) => {
    alert("앨범이 삭제되었습니다.");
    window.location.assign("/photo/main");
  });
}
export default function PhotoMain() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AlbumDO>(
    new AlbumDO("", "", "", "", "", "", [])
  );
  const [albumName, setAlbumName] = useState("");
  const [accessToken_usr, setAccessToken_usr] = useState("");
  const [albumInfoList, setAlbumInfoList] = useState<AlbumDO[]>([]);
  const [dday, setDday] = useState("");
  const [description, setDescription] = useState("");
  const [ddayDescription, setDdayDescription] = useState("");
  const openCreateAlbumDialog = () => {
    setCreateDialog(true);
  };
  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };
  const closeCreateAlbumDialog = () => {
    setCreateDialog(false);
  };
  const changeAlbumName = (e: any) => {
    setAlbumName(e.target.value);
  };
  const changeDday = (e: any) => {
    setDday(e.target.value);
  };
  const changeDdayDescription = (e: any) => {
    setDdayDescription(e.target.value);
  };
  const changeDescription = (e: any) => {
    setDescription(e.target.value);
  };
  const postCreateAlbum = () => {
    let accessToken = localStorage.getItem("accessToken");
    let userId = localStorage.getItem("userid");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let day = today.getDay();
    let todayStr = year + "년" + month + "월" + date + "일";
    if (dday.length == 0) {
      setDday("none");
    }
    if (albumName.length == 0) {
      alert("앨범이름을 입력해주세요!");
      return;
    }
    if (description.length == 0) {
      alert("앨범설명을 입력해주세요!");
      return;
    }
    if (ddayDescription.length == 0) {
      setDdayDescription("none");
      return;
    }
    axios
      .post(
        rootURL +
          "/album/" +
          userId +
          "/" +
          albumName +
          "/" +
          todayStr +
          "/" +
          dday +
          "/" +
          description +
          "/" +
          ddayDescription
      )
      .then((res) => {
        alert("앨범 등록이 완료되었습니다!");
        window.location.assign("/photo/main");
      });
  };
  const init = async () => {
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
        console.log(res.data);
        setAlbumInfoList(res.data as AlbumDO[]);
      });
    }
  };
  useEffect(() => {
    init();
  }, []);
  return useObserver(() => {
    return (
      <>
        <MenuBar />
        {AlbumStore.albumIsSeleted ? (
          <>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                onClick={() => {
                  AlbumStore.openPhotoPostDialog = true;
                }}
                style={{
                  fontFamily: "Yeon Sung",
                  border: "1px solid black",
                  width: "20rem",
                  marginTop: "50px",
                  marginBottom: "1rem",
                  justifyContent: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                추억 쌓기
              </Button>
              <PhotoPostDialog />
            </div>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                onClick={()=>{AlbumStore.openInviteDialog=true;}}
                style={{
                  fontFamily: "Yeon Sung",
                  border: "1px solid black",
                  width: "20rem",
                  marginBottom: "1rem",
                  justifyContent: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                앨범 초대하기
              </Button>
              <InviteDialog/>
            </div>
            <PhotoAlbum />
          </>
        ) : (
          <>
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
                  marginTop: "47px",
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
                나의 Private Album
              </div>
              <div className={"albumcardcontainer"}>
                {albumInfoList.length > 0 ? (
                  <>
                    {albumInfoList.map((item: AlbumDO) => {
                      return (
                        <>
                          <div className="btngroup">
                            <Button
                              className="item"
                              onClick={() => {
                                AlbumStore.albumIsSeleted = true;
                                AlbumStore.clickedAlbum = item;
                              }}
                            >
                              <strong>{item.albumName}</strong>
                            </Button>
                            <Button
                              onClick={() => {
                                setDeleteTarget(item);
                                setDeleteDialog(true);
                              }}
                            >
                              {" "}
                              <DeleteSharpIcon />
                            </Button>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
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
                  앨범 이름
                  <div
                    style={{
                      fontFamily: "Cafe24SsurroundAir",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                      width: "20rem",
                    }}
                  >
                    <TextField onChange={changeAlbumName} fullWidth={true} />
                  </div>
                  기념일
                  <div
                    style={{
                      fontFamily: "Cafe24SsurroundAir",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <TextField
                      onChange={changeDdayDescription}
                      fullWidth={true}
                      type="date"
                    />
                  </div>
                  기념일 설명
                  <div
                    style={{
                      fontFamily: "Cafe24SsurroundAir",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <TextField onChange={changeDday} fullWidth={true} />
                  </div>
                  앨범 설명
                  <div
                    style={{
                      fontFamily: "Cafe24SsurroundAir",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <TextField onChange={changeDescription} fullWidth={true} />
                  </div>
                </>
              </DialogContent>
              <DialogActions>
                <Button onClick={postCreateAlbum}>확인</Button>
                <Button onClick={closeCreateAlbumDialog}>취소</Button>
              </DialogActions>
            </Dialog>
            <Dialog open={deleteDialog}>
              <DialogTitle
                style={{
                  fontFamily: "Cafe24SsurroundAir",
                  fontSize: "1.5rem",
                }}
              >
                앨범 삭제
              </DialogTitle>
              <DialogContent
                style={{
                  fontFamily: "Cafe24SsurroundAir",
                  fontSize: "0.8rem",
                }}
              >
                <>
                  다음 앨범이 삭제됩니다. 계속하시겠습니까?
                  <br />
                  <br />
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      fontSize: "1.1rem",
                    }}
                  >
                    {deleteTarget.albumName}
                  </div>
                </>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    deleteAlbum(deleteTarget.id);
                  }}
                >
                  확인
                </Button>
                <Button onClick={closeDeleteDialog}>취소</Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </>
    );
  });
}
