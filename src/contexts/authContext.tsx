import React, { Component, createContext } from "react";
import { KAKAO_API_KEY } from "../key/API_KEY";
import axios from "axios";

const Context = createContext({}); // Context 를 만듭니다.
const { Provider, Consumer: AuthConsumer } = Context;

interface Props {
  postDatas: any;
}

interface State {
  isOpen: boolean;
  isLogin: boolean;
  loading: boolean;
  postDatas: Array<object>;
}

class AuthProvider extends Component<Props, State> {
  state: State = {
    isOpen: false,
    isLogin: false,
    loading: false,
    postDatas: []
  };

  actions = {
    onModal: () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    },
    onLogin: () => {
      return this.state.isLogin;
    },
    onLogOut: async () => {
      await window.Kakao.Auth.logout();
      this.getLoginStatus();
    }
  };

  componentDidMount() {
    //Kakao SDK에서 사용한 리소스를 해제합니다.
    window.Kakao.cleanup();
    //Kakao SDK를 초기화합니다.
    window.Kakao.init(KAKAO_API_KEY);

    // 토큰 연결 여부
    this.getLoginStatus();

    //로그인
    this.login();
  }

  login = () => {
    window.Kakao.Auth.createLoginButton({
      container: ".kakao-login-btn",
      success: authObj => {
        this.setState({
          loading: true
        });
        axios
          .post("https://mad-server.herokuapp.com/kakaologin", {
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            Authorization: `Bearer ${authObj.access_token}`
          })
          .then(res => {
            // console.log("@KakaoLogin", res);
            // 토큰 연결 여부
            this.getLoginStatus();
            //모달 및 로딩 제거
            this.setState({
              isOpen: false,
              loading: false
            });
          })
          .catch(err => console.log(err));
      },
      fail: err => {
        console.log(err);
      }
    });
  };

  // 로그인 상태 체크
  getLoginStatus = () => {
    window.Kakao.Auth.getStatus(
      function(statusObj) {
        console.log("1.getLoginStatus", statusObj);
        if (statusObj.status === "connected") {
          localStorage.setItem("loginId", statusObj.user.id);
          this.setState({
            isLogin: true
          });
        } else {
          localStorage.removeItem("loginId");
          this.setState({
            isLogin: false
          });
        }
        //post 데이터 가져오기
        this.getPostDatas();
      }.bind(this)
    );
  };

  //post 데이터 가져오기
  getPostDatas = async () => {
    // console.log("2.getPostDatas - userId :", localStorage.getItem("loginId"));
    const postDatas = await this.callPostDatasApi();
    if (!postDatas) return false;
    this.props.postDatas(postDatas);
  };

  //post API 호출
  callPostDatasApi = () => {
    return axios
      .post("https://mad-server.herokuapp.com/api/post/list", {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        userId: localStorage.getItem("loginId")
      })
      .then(res => {
        // console.log("3.callPostDatasApi :", res.data);
        return res.data;
      })
      .catch(err => console.log(err));
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { AuthProvider, AuthConsumer };