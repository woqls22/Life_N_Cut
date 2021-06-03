import { observable, ObservableSet } from "mobx";
import { AlbumDO } from "../Component/Mypage";
import { ImgDO } from "../Component/PhotoAlbum";
export class LoginInfoDO{
    constructor(
        public id:string,
      ){}
}
interface AlbumStore {
  albumIsSeleted:boolean;
  clickedAlbum:AlbumDO;
  openPhotoPostDialog:boolean;
  reload:boolean;
  AlbumImgList:ImgDO[];
  openInviteDialog:boolean;
}
const AlbumStore = observable<AlbumStore>({
    albumIsSeleted:false,
    clickedAlbum:new AlbumDO("","","","","","",[]),
    openPhotoPostDialog:false,
    reload:false,
    AlbumImgList:[],
    openInviteDialog:false,
});
export default AlbumStore;
