import { Button } from "@material-ui/core";
import { useObserver } from "mobx-react";
import React from "react";
import LoginStore, { LoginInfoDO } from "../Stores/LoginStore";
export default function MenuBar() {
  const openLoginForm = () => {
    if (LoginStore.isLoggedIn) {
      // 로그아웃
      LoginStore.setIsLoggedIn(false);
      LoginStore.setLoginInfo(new LoginInfoDO(""));
      alert("로그아웃 되었습니다!");
    } else {
      // 로그인 창 띄우기
      window.location.assign("/login");
      // LoginStore.setLoginDialogVariable(true);
    }
  };
  const openPhotoAlbum = () => {
    if (LoginStore.isLoggedIn) {
      //    서비스렌더링
    } else {
      // 로그인 창 띄우기
      window.location.assign("/login");
      // LoginStore.setLoginDialogVariable(true);
    }
  };
  const openBucketPlace = () => {
    if (LoginStore.isLoggedIn) {
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
          <div className="item">
            <Button onClick={openLoginForm}>
              {LoginStore.isLoggedIn ? <>Logout</> : <>Login</>}
            </Button>
          </div>
        </div>
      </>
    );
  });
}
