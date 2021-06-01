import { Button } from "@material-ui/core";
import React from "react";
import "../styles/HomeComponent.css";
import firstImg from "../res/1.jpg";
import secondImg from "../res/2.jpg";
import thirdimg from "../res/3.jpg";
import fourthImg from "../res/4.jpg";
import wishList from "../res/5.jpg";
import dDay from "../res/6.jpg";
import { useEffect } from "react";
import { useState } from "react";
import LoginStore, { LoginInfoDO } from "../Stores/LoginStore";
import { useObserver } from "mobx-react";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
function PhotoItem(Background: any) {
  return (
    <>
      <div
        className="photoItem"
        style={{ backgroundImage: `url(${Background})` }}
      ></div>
    </>
  );
}
function PhotoItemWithBorder(Background: any) {
  return (
    <>
      <div
        className="photoItems"
        style={{ backgroundImage: `url(${Background})`, marginBottom: "1%" }}
      ></div>
    </>
  );
}
export const MenuBar = () => {
  const openLoginForm = () => {
     
      if(LoginStore.isLoggedIn){ // 로그아웃
        LoginStore.setIsLoggedIn(false);
        LoginStore.setLoginInfo(new LoginInfoDO(""));
        alert("로그아웃 되었습니다!");
      }
      else{ // 로그인 창 띄우기
        window.location.assign("/login");
        // LoginStore.setLoginDialogVariable(true);
      }
  };
  return useObserver(()=>{
    return (
        <>
          <div className={"menuBar"}>
            <div className="item">
              <Button onClick={()=>{window.location.assign("/")}}>Home</Button>
            </div>
            <div className="item">
              <Button>PHOTO</Button>
            </div>
            <div className="item">
              <Button>PLACE</Button>
            </div>
            <div className="item">
              <Button onClick={openLoginForm}> 
              {LoginStore.isLoggedIn?<>Logout</>:<>Login</>}
              </Button>
            </div>
          </div>
        </>
      );
  })
 
};
export default function HomeComponent() {
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <>
      <div className={"homeContainer"}>
        <MenuBar />
        
        <div className={"wrapper"}>
          <div className="container">
            <p>
              <strong>인 생 N 컷</strong>
            </p>
            <div className="meta">
              소중한 추억을 친구, 연인과 함께 쌓아보세요!
              <br /> #Photo #Album #Private
              <br />
              <br />
              <Button
                style={{ fontFamily: "Yeon Sung", border: "1px solid black" }}
              >
                지금 앨범만들기
              </Button>
            </div>
            <div className={"ncutImg"}>
              <div className={"whitesection"}>
                <div className="whiterect">{PhotoItem(firstImg)}</div>
                <div className="whiterect">{PhotoItem(secondImg)}</div>
                <div className="whiterect">{PhotoItem(thirdimg)}</div>
                <div className="whiterect">{PhotoItem(fourthImg)}</div>
              </div>
            </div>
            <div
              className={"introducetext"}
              style={{
                // opacity: (window.scrollY - 100) / 250,
                marginTop: "15px",
              }}
            >
              인생 N컷은 친구, 연인과 함께 <br /> 추억을 공유할 수 있는 <br/>Private
              Album입니다.
            </div>
            <div
              className={"introducetext"}
              style={{
                opacity: (window.scrollY - 550) / 250,
              }}
            >
              '우리만의' 앨범에 <br />
              사진을 업로드 하고
            </div>
            <div
              className={"introducetext"}
              style={{
                opacity: (window.scrollY - 750) / 250,
              }}
            >
              <br /> 소중한 사람들과 <br />
              추억을 공유할 수 있어요.
            </div>
            <div
              className={"introducetext"}
              style={{
                opacity: (window.scrollY - 850) / 250,
              }}
            >
              <br />
              <div className="wishcontainer">
                {PhotoItemWithBorder(wishList)}
              </div>
              '우리가 가야할 곳'을 저장하고
              <br /> 버킷리스트를 작성할 수도 있죠.
              <br />
              <br />
            </div>
            <div
              className="introducetext"
              style={{
                opacity: (window.scrollY - 1250) / 250,
              }}
            >
              <div className="wishcontainer">{PhotoItemWithBorder(dDay)}</div>
              디데이를 설정하고, 우리가 함께한 <br />
              시간도 기억할 수 있어요.
              <br />
            </div>
            <div
              className="introducetext"
              style={{
                opacity: (window.scrollY - 1450) / 250,
              }}
            >
              <br />
              소중한 '지금'
              <br /> 같이 기억하는 건 어때요?
              <br />
              <Button
                style={{
                  fontFamily: "Yeon Sung",
                  border: "1px solid black",
                  marginTop: "2%",
                }}
              >
                지금 앨범만들기
              </Button>
            </div>
          </div>
        </div>
        <div className={"bottomDiv"}>
          <div className={"metabottom"}>
            개발자 : 이재빈
            <br />
            MAIL : woqls226@gmail.com
            <br />
            GITHUB : https://github.com/woqls22
          </div>
        </div>
      </div>
    </>
  );
}
