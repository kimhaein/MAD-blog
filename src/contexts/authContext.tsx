/**
 * 권한 관련 context
 */
import React, { Component, createContext } from "react";
import { KAKAO_API_KEY } from "../key/API_KEY";
import axios from "axios";

//Context 생성
const Context = createContext({});
const { Provider, Consumer: AuthConsumer } = Context;

/**
 * setLoading : 로딩 처리 이벤트
 * isModal: 모달 open 여부
 * isLogin: 로그인 여부
 * loading: 로딩 display 여부
 * onModal: 모달 이벤트
 * onLogin: 로그인 이벤트
 * onLogout: 로그아웃 이벤트
 */
declare var Kakao: any;

interface Props {
  onLoading(state: boolean): void;
}

interface State {
  isModal: boolean;
  isLogin: boolean;
  isMenu: boolean;
  isLoading: boolean;
  userId: string;
  userName: string;
  userImg: string;
}

interface AuthStatus {
  status: string;
  user: {
    id: string;
    properties: {
      nickname: string;
      profile_image: string;
    };
  };
}

class AuthProvider extends Component<Props, State> {
  state: State = {
    isModal: false,
    isLogin: false,
    isMenu: false,
    isLoading: false,
    userId: "",
    userName: "",
    userImg: ""
  };

  actions = {
    onModal: () => {
      this.setState({
        isModal: !this.state.isModal
      });
    },
    onLogin: () => {
      Kakao.Auth.login({
        success: (authObj: { access_token: string }) => {
          this.props.onLoading(true);
          axios
            .post("https://mad-server.herokuapp.com/kakaologin", {
              headers: { "Content-type": "application/x-www-form-urlencoded" },
              Authorization: `Bearer ${authObj.access_token}`
            })
            .then(async res => {
              await this.actions.getLoginStatus();
              await this.setState({ isModal: false });
              this.props.onLoading(true);
            })
            .catch((err: object) => console.log(err));
        },
        fail: (err: object) => {
          console.log(err);
        }
      });
    },
    onLogOut: async () => {
      await Kakao.Auth.logout();
      await this.actions.getLoginStatus();
    },
    onMenu: () => {
      this.setState({
        isMenu: !this.state.isMenu
      });
    },
    getLoginStatus: () => {
      console.log(Kakao.Auth)
      Kakao.Auth.getStatusInfo((authStatus: AuthStatus) => {
        console.log("1.getLoginStatus", authStatus);
        if (authStatus.status === "connected") {
          // 고객 데이터 localStorage 저장
          this.setState({
            isLogin: true,
            userId: authStatus.user.id,
            userName: authStatus.user.properties.nickname,
            userImg: authStatus.user.properties.profile_image
          });
        } else {
          this.setState({
            isLogin: false,
            userId: "",
            userName: "",
            userImg: ""
          });
        }
      });
    }
  };

  componentDidMount() {
    //Kakao SDK에서 사용한 리소스를 해제합니다.
    Kakao.cleanup();
    //Kakao SDK를 초기화합니다.
    Kakao.init(KAKAO_API_KEY);
    //현재 로그인 상태 체크
    this.props.onLoading(true);
    this.actions.getLoginStatus();
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { AuthProvider, AuthConsumer };
