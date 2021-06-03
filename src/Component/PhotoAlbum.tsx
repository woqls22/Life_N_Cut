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
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";

async function fetchData(id: string) {
  return await axios.get(rootURL + "/imgs/" + id);
}

export class ImgDO {
  fileId:string;
  imgUrl: string;
  date: string;
  description: string;
  albumId: string;
  constructor(
    fileId:string,
    imgUrl: string,
    date: string,
    description: string,
    albumId: string
  ) {
    this.fileId=fileId;
    this.imgUrl = imgUrl;
    this.date = date;
    this.description = description;
    this.albumId = albumId;
  }
}

export default function PhotoAlbum() {
  const [expanded, setExpanded] = useState<any>("false");
  const [fileId,setFileId]=useState("");
  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };
  async function deletePic(id:string){
    let accessToken = localStorage.getItem("accessToken");
    let userId = localStorage.getItem("userid");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    await axios.delete(rootURL + "/imgs/" + id).then((res) => {
      alert("사진이 삭제되었습니다.");
      fetchData(AlbumStore.clickedAlbum.id).then((res) => {
        let tmpimgList: any[] = [];
        res.data.map((item: any) => {
          tmpimgList.push(
            new ImgDO(item.fileId,item.filename, item.date, item.description, item.albumId)
          );
        });
        setImgList(tmpimgList);
        AlbumStore.AlbumImgList = tmpimgList;
        AlbumStore.deletePicDialog=false;
        setFileId("");
      });
    });
  }
  const [imgList, setImgList] = useState<ImgDO[]>([]);
  const openDeleteDialog=(file_id:string)=>{
    AlbumStore.deletePicDialog=true;
    setFileId(file_id);
  }
  const closeDeleteDialog=()=>{
    AlbumStore.deletePicDialog=false;
    setFileId("");
  }
  useEffect(() => {
    fetchData(AlbumStore.clickedAlbum.id).then((res) => {
      let tmpimgList: any[] = [];
      res.data.map((item: any) => {
        tmpimgList.push(
          new ImgDO(item.fileId,item.filename, item.date, item.description, item.albumId)
        );
      });
      setImgList(tmpimgList);
      AlbumStore.AlbumImgList = tmpimgList;
    });
  }, []);
  return useObserver(() => {
    return (
      <>
        <div className={"photoList"}>
          {AlbumStore.AlbumImgList.map((item: ImgDO) => {
            return (
              <>
                <div className={"tabRow" + 1}
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
                            <DeleteSharpIcon style={{float:"right"}} onClick={()=>{openDeleteDialog(item.fileId)}}/>
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
