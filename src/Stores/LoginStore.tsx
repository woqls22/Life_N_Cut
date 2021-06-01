import { observable, ObservableSet } from "mobx";

interface LoginStore {
  openLoginDialog:boolean;
  setLoginDialogVariable:(flag:boolean)=>void;
}

const LoginStore = observable<LoginStore>({
    openLoginDialog:false,
    setLoginDialogVariable(flag){
        this.openLoginDialog=flag;
    }
});
export default LoginStore;
