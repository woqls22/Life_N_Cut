import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useObserver } from "mobx-react-lite";
import { FormControl } from "@material-ui/core";
import axios from "axios";
import AlbumStore from "../Stores/AlbumStore";
import { rootURL } from "../Constants";
import { ImgDO } from "./PhotoAlbum";
async function fetchData(id: string) {
    return await axios.get(rootURL + "/imgs/" + id);
  }
export default function PhotoPostDialog() {
  const handleClose = () => {
    AlbumStore.openPhotoPostDialog = false;
    setDate("");
    setDescription("");
    setFiles([]);
  };
  const [files, setFiles] = useState<File[]>([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const postPhotoDO = async () => {
    // Post Request
    const formData = new FormData();
    formData.append("albumId",AlbumStore.clickedAlbum.id)
    formData.append("file", files[0]);
    formData.append("date",date);
    formData.append("description",description);
    const res = await axios.post(rootURL+"/img/upload", formData).then((res)=>{
        AlbumStore.openPhotoPostDialog = false;
        setDate("");
        setDescription("");
        setFiles([]);
        alert("사진이 등록되었습니다");
        fetchData(AlbumStore.clickedAlbum.id).then((res) => {
            let tmpimgList: any[] = [];
            res.data.map((item: any) => {
              tmpimgList.push(
                new ImgDO(item.filename, item.date, item.description, item.album_id)
              );
            });
            AlbumStore.AlbumImgList=tmpimgList;
          });
    });
  };
  const changeDate = (e: any) => {
    setDate(e.target.value);
  };
  const changeDescription = (e: any) => {
    setDescription(e.target.value);
  };
  return useObserver(() => {
    return (
      <div>
        <Dialog open={AlbumStore.openPhotoPostDialog} onClose={handleClose}>
          <DialogTitle>
            <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "2rem",
                width: "400rem",
              }}
            >
              추억 쌓기
            </div>
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "1.5rem",
                width: "400rem",
              }}
            >
              사진
            </div>
            <Button>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={(e: any) => {
                  setFiles(e.target.files);
                }}
              />
              <label htmlFor="raised-button-file">Upload</label>
            </Button>
            {files.length>0 ? <>{"Done."}</> : <></>}
            <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "1.5rem",
                width: "400rem",
              }}
            >
              날짜
            </div>
            <TextField
              margin="dense"
              type="date"
              fullWidth
              onChange={changeDate}
            />
            <div
              style={{
                fontFamily: "Hi Melody",
                fontSize: "1.5rem",
                width: "400rem",
                marginTop: "1rem",
              }}
            >
              설명
            </div>
            <TextField
              margin="dense"
              fullWidth
              onChange={changeDescription}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={postPhotoDO} color="primary">
              확인
            </Button>
            <Button onClick={handleClose} color="primary">
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  });
}