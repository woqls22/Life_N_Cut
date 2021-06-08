import axios from "axios";
import { useObserver } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useState } from "react";
import { rootURL } from "../Constants";
import AlbumStore from "../Stores/AlbumStore";
import "../styles/PhotoAlbum.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
} from "@material-ui/core";
function getDateCount(dateStr:string){
  let date = new Date(dateStr);
  let today = new Date();
  var gap = today.getTime() - date.getTime();
  let result= Math.floor(gap / (1000 * 60 * 60 * 24))+1;
  return parseInt(result.toString());
}
async function fetchData(id: string, page:number) {
  return await axios.get(rootURL + "/imgs/" + id+"/"+page);
}

export class ImgDO {
  fileId: string;
  imgUrl: string;
  date: string;
  description: string;
  albumId: string;
  constructor(
    fileId: string,
    imgUrl: string,
    date: string,
    description: string,
    albumId: string
  ) {
    this.fileId = fileId;
    this.imgUrl = imgUrl;
    this.date = date;
    this.description = description;
    this.albumId = albumId;
  }
}
function isInclude(name:string){
  for(var i = 0; i<AlbumStore.AlbumImgList.length;i++){
    if(AlbumStore.AlbumImgList[i].imgUrl==name){
      return true;
    }
  }
  return false;
}
function sleep(ms:any) {
  return new Promise((r) => setTimeout(r, ms));
}
export default function PhotoAlbum() {
  const [expanded, setExpanded] = useState<any>("false");
  const [fileId, setFileId] = useState("");
  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [blackTheme, setBlackTheme] = useState(false);
  let startPage = 0;
  async function deletePic(id: string) {
    let accessToken = localStorage.getItem("accessToken");
    let userId = localStorage.getItem("userid");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    await axios.delete(rootURL + "/imgs/" + id).then((res) => {
      alert("사진이 삭제되었습니다.");
      fetchData(AlbumStore.clickedAlbum.id,0).then((res) => {
        AlbumStore.AlbumImgList=[];
        res.data.map((item: any) => {
          if(!isInclude(item.fileId)){
            AlbumStore.AlbumImgList=[...AlbumStore.AlbumImgList, new ImgDO(
              item.fileId,
              item.filename,
              item.date,
              item.description,
              item.albumId
            )]
            // tmpimgList.push(
            //   new ImgDO(
            //     item.fileId,
            //     item.filename,
            //     item.date,
            //     item.description,
            //     item.albumId
            //   )
            // );
          }
        });
        // AlbumStore.AlbumImgList = [tmpimgList];
        AlbumStore.deletePicDialog = false;
        setFileId("");
      });
    });
  }
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
    let elem: HTMLElement = document.getElementsByClassName(
      "root"
    )[0] as HTMLElement;
    if(window.scrollY+window.innerHeight>=elem.scrollHeight){
      sleep(100).then(()=>{
        fetchData(AlbumStore.clickedAlbum.id,startPage+1).then((res) => {
          let tmpimgList: any[] = [...AlbumStore.AlbumImgList];
          res.data.map((item: any) => {
            if(!isInclude(item.filename)){
              AlbumStore.AlbumImgList=[...AlbumStore.AlbumImgList, new ImgDO(
                item.fileId,
                item.filename,
                item.date,
                item.description,
                item.albumId
              )];
          }});
          // AlbumStore.AlbumImgList = tmpimgList;
        startPage=startPage+1;
        });
      })
    }
  }
  const openDeleteDialog = (file_id: string) => {
    AlbumStore.deletePicDialog = true;
    setFileId(file_id);
  };
  const closeDeleteDialog = () => {
    AlbumStore.deletePicDialog = false;
    setFileId("");
  };

  const changeTheme = (event: any) => {
    if (event.target.checked == true) {
      setBlackTheme(true);
      let elem: HTMLElement = document.getElementsByClassName(
        "root"
      )[0] as HTMLElement;
      elem.style.backgroundColor = "black";
      elem = document.getElementById("themeselector") as HTMLElement;
      elem.style.color = "white";
      elem = document.getElementById("invitebtn") as HTMLElement;
      elem.style.color = "black";
      elem = document.getElementById("uploadpic") as HTMLElement;
      elem.style.color = "black";
    } else {
      setBlackTheme(false);
      let elem: HTMLElement = document.getElementsByClassName(
        "root"
      )[0] as HTMLElement;
      elem.style.backgroundColor = "white";
      elem = document.getElementById("themeselector") as HTMLElement;
      elem.style.color = "black";
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    fetchData(AlbumStore.clickedAlbum.id,startPage).then((res) => {
      let tmpimgList: any[] = [];
      res.data.map((item: any) => {
        tmpimgList.push(
          new ImgDO(
            item.fileId,
            item.filename,
            item.date,
            item.description,
            item.albumId
          )
        );
      });
      AlbumStore.AlbumImgList = tmpimgList;
    });
  }, []);
  return useObserver(() => {
    return (
      <>
        <div
          style={{
            width: "20rem",
            justifyContent: "center",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Accordion
            expanded={expanded === "panel"}
            onChange={handleChange("panel")}
            square={false}
            style={{
              boxShadow: "none",
              border: "1px solid black",
            }}
          >
            <AccordionSummary
              aria-controls="panel4bh-content"
              id="panel4bh-header"
              style={{
                textAlign: "center",
                fontFamily: "Yeon Sung",
                marginTop: "-2%",
                marginBottom: "-2%",
              }}
            >
              {AlbumStore.clickedAlbum.albumName}앨범 정보
            </AccordionSummary>
            <AccordionDetails>
              <div className={"albumMetaText"} style={{ color: "black" }}>
                {AlbumStore.clickedAlbum.dday} {" "+getDateCount(AlbumStore.clickedAlbum.ddayDescription)+"일"}
                <br />
                {AlbumStore.clickedAlbum.ddayDescription.split("-")[0]+"년"+AlbumStore.clickedAlbum.ddayDescription.split("-")[1]+"월"+AlbumStore.clickedAlbum.ddayDescription.split("-")[2]+"일"}
                <br/>
                앨범접근권한 : {AlbumStore.clickedAlbum.authorIdList.map((id:any)=>{return(<>{id+" "}</>)})}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div
          style={{
            width: "20rem",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
          }}
        >
          <Checkbox onChange={changeTheme} />
          <div
            id="themeselector"
            style={{
              verticalAlign: "middle",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            Black Theme
          </div>
        </div>
        <div
          className={"photoList"}
          style={{
            backgroundColor: blackTheme ? "black" : "white",
            width: "100%",
          }}
        >
          {AlbumStore.AlbumImgList.map((item: ImgDO) => {
            return (
              <>
                <div
                  className={"tabRow" + 1}
                  style={{
                    boxShadow: "none",
                    width: "20rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <div
                    className={"photoListItem"}
                    style={{
                      backgroundImage:
                        "url(" +
                        rootURL +
                        "/imgURL?imagename=" +
                        item.imgUrl +
                        ")",
                    }}
                  ></div>
                  <div className="albumtextbox">
                    <div className={"dateText"}>
                      {item.date}
                      <div className={"descriptionText"}>
                        {item.description}
                        <DeleteSharpIcon
                          style={{ float: "right" }}
                          onClick={() => {
                            openDeleteDialog(item.fileId);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <Accordion
                    expanded={expanded === "panel" + item.imgUrl}
                    onChange={handleChange("panel" + item.imgUrl)}
                    square={false}
                    style={{
                      boxShadow: "none",
                      width: "20rem",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <AccordionSummary
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <div
                        className={"photoListItem"}
                        style={{
                          backgroundImage:
                            "url(" +
                            rootURL +
                            "/imgURL?imagename=" +
                            item.imgUrl +
                            ")",
                        }}
                        onMouseEnter={() => {
                          // let elem: HTMLElement = document.getElementsByClassName(
                          //   "middleDiv"
                          // )[0] as HTMLElement;
                          // elem.style.backgroundImage =
                          //   "url(http://133.186.241.96:8080/imgURL?imagename=" +
                          //   item.imgUrl +
                          //   ")";
                          // elem.style.backgroundRepeat = "no-repeat";
                          // elem.style.backgroundPosition = "center";
                          // elem.style.backgroundSize = "cover";
                          // elem.style.borderRadius = "100px";
                          // elem.style.transition = " all 1s ease-in-out";
                          // elem.style.animation = "fadein 3s";
                        }}
                        onMouseLeave={() => {
                          // let elem: HTMLElement = document.getElementsByClassName(
                          //   "middleDiv"
                          // )[0] as HTMLElement;
                          // elem.style.transform = "scale(1.0)";
                          // elem.style.transition = " all 1s ease-in-out";
                          // elem.style.animation = "fadeout 3s";
                          // elem.style.animationFillMode = "forwards";
                        }}
                      ></div>
                    </AccordionSummary>
                    <AccordionDetails
                      style={{
                        marginTop: 0,
                        padding: 0,
                        width: "20rem",
                        marginLeft: "auto",
                        marginRight:"auto"
                      }}
                    >
                      <div className="albumtextbox">
                        <div className={"dateText"}>
                          {item.date}
                          <div className={"descriptionText"}>
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion> */}

                  {/* <Bar /> */}
                </div>
              </>
            );
          })}
        </div>
        <Dialog open={AlbumStore.deletePicDialog}>
          <DialogTitle
            style={{
              fontFamily: "Cafe24SsurroundAir",
              fontSize: "1.5rem",
            }}
          >
            사진 삭제
          </DialogTitle>
          <DialogContent
            style={{
              fontFamily: "Cafe24SsurroundAir",
              fontSize: "0.8rem",
            }}
          >
            <>
              해당 사진을 삭제하시겠습니까?
              <br />
            </>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                deletePic(fileId);
              }}
            >
              확인
            </Button>
            <Button onClick={closeDeleteDialog}>취소</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  });
}
