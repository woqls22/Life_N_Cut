import axios from "axios";
import { useObserver } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { rootURL } from "../Constants";
import AlbumStore from "../Stores/AlbumStore";
import "../styles/PhotoAlbum.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
async function fetchData(id: string) {
  return await axios.get(rootURL + "/imgs/" + id);
}
export class ImgDO {
  imgUrl: string;
  date: string;
  description: string;
  album_id: string;
  constructor(
    imgUrl: string,
    date: string,
    description: string,
    album_id: string
  ) {
    this.imgUrl = imgUrl;
    this.date = date;
    this.description = description;
    this.album_id = album_id;
  }
}
export default function PhotoAlbum() {
  const [expanded, setExpanded] = useState<any>("false");
  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [imgList, setImgList] = useState<ImgDO[]>([]);
  useEffect(() => {
    fetchData(AlbumStore.clickedAlbum.id).then((res) => {
      let tmpimgList: any[] = [];
      res.data.map((item: any) => {
        tmpimgList.push(
          new ImgDO(item.filename, item.date, item.description, item.album_id)
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
                <div className={"tabRow" + 1}>
                  <Accordion
                    expanded={expanded === "panel" + item.imgUrl}
                    onChange={handleChange("panel" + item.imgUrl)}
                    square={false}
                    style={{ boxShadow: "none", margin: "0 0" }}
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
                    <AccordionDetails style={{ marginTop: 0, padding: 0 }}>
                      <div className="albumtextbox">
                      <div className={"dateText"}>
                        {item.date}
                        <div className={"descriptionText"}>
                          {item.description}
                        </div>
                      </div>
                      </div>
                      
                    </AccordionDetails>
                  </Accordion>

                  {/* <Bar /> */}
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  });
}
