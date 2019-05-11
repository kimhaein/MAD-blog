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
 * postDatas: post 관련 json 데이터
 * isOpen: 모달 open 여부
 * isLogin: 로그인 여부
 * loading: 로딩 display 여부
 * onModal: 모달 이벤트
 * onLogin: 로그인 이벤트
 * onLogout: 로그아웃 이벤트
 */

interface Props {
  postDatas: any;
}
interface State {
  isOpen: boolean;
  isLogin: boolean;
  loading: boolean;
}

class AuthProvider extends Component<Props, State> {
  state: State = {
    isOpen: false,
    isLogin: false,
    loading: false
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

    this.getLoginStatus();
    this.login();
  }

  /**
   * kakao 로그인
   */
  login = () => {
    window.Kakao.Auth.createLoginButton({
      container: ".kakao-login-btn",
      success: authObj => {
        this.setState({ loading: true });
        axios
          .post("https://mad-server.herokuapp.com/kakaologin", {
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            Authorization: `Bearer ${authObj.access_token}`
          })
          .then(res => {
            this.getLoginStatus();
            this.setState({ isOpen: false, loading: false });
          })
          .catch(err => console.log(err));
      },
      fail: err => {
        console.log(err);
      }
    });
  };

  /**
   * 로그인 토큰 연결 여부 확인
   */
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

  /**
   * posts 관련 json 데이터 state 저장
   */
  getPostDatas = async () => {
    const postDatas = await this.callPostDatasApi();
    if (!postDatas) return false;
    // 권한에 따른 전역 postDatas 업데이트
    this.props.postDatas(postDatas.post);
  };

  /**
   * posts 관련 데이터 조회
   */
  callPostDatasApi = () => {
    return axios
      .post("https://mad-server.herokuapp.com/api/post/list", {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        userId: localStorage.getItem("loginId")
      })
      .then(res => {
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
