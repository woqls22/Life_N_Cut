import { Button } from "@material-ui/core";
import { useObserver } from "mobx-react";
import React from "react";
import LoginStore, { LoginInfoDO } from "../Stores/LoginStore";
export default function MenuBar() {
  const openLoginForm = () => {
    if (localStorage.getItem("userInfo")) {
      // 로그아웃
      LoginStore.setIsLoggedIn(false);
      LoginStore.setLoginInfo(new LoginInfoDO(""));
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userid");
      alert("로그아웃 되었습니다!");
      window.location.assign("/");
    } else {
      // 로그인 창 띄우기
      window.location.assign("/login");
      // LoginStore.setLoginDialogVariable(true);
    }
  };
  const openPhotoAlbum = () => {
    if (localStorage.getItem("userInfo")) {
      //    서비스렌더링
      window.location.assign("/photo/main");
    } else {
      // 로그인 창 띄우기
      window.location.assign("/login");
      // LoginStore.setLoginDialogVariable(true);
    }
  };
  const openSetting = () => {
    if (localStorage.getItem("userInfo")) {
      window.location.assign("/mypage");
    }
  };
  const openBucketPlace = () => {
    if (localStorage.getItem("userInfo")) {
      //    서비스렌더링
    } else {
      // 로그인 창 띄우기
      window.location.assign("/login");
      // LoginStore.setLoginDialogVariable(true);
    }
  };
  return useObserver(() => {
    return (
      <>
        <div className={"menuBar"}>
          <div className="item">
            <Button
              onClick={() => {
                window.location.assign("/");
              }}
            >
              Home
            </Button>
          </div>
          <div className="item">
            <Button onClick={openPhotoAlbum}>PHOTO</Button>
          </div>
          <div className="item">
            <Button onClick={openBucketPlace}>PLACE</Button>
          </div>

          {localStorage.getItem("userInfo") ? (
            <div className="item">
              {" "}
              <Button onClick={openSetting}>MY</Button>{" "}
            </div>
          ) : (
            <></>
          )}

          <div className="item">
            <Button onClick={openLoginForm}>
              {localStorage.getItem("userInfo") ? <>Logout</> : <>Login</>}
            </Button>
          </div>
        </div>
      </>
    );
  });
}
