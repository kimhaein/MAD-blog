import React, { Component, createContext } from "react";
import { KAKAO_API_KEY } from "../key/API_KEY";
import axios from "axios";

const Context = createContext({}); // Context 를 만듭니다.
const { Provider, Consumer: AuthConsumer } = Context;

interface State {
  isOpen: boolean;
  isLogin: boolean;
  loading: boolean;
  postDatas: Array<object>;
}

class AuthProvider extends Component<{}, State> {
  state: State = {
    isOpen: false,
    isLogin: false,
    loading: false,
    postDatas: []
  };

  componentDidMount() {
    window.Kakao.init(KAKAO_API_KEY);

    // 토큰 연결 여부
    window.Kakao.Auth.getStatus(
      function(statusObj) {
        console.log(statusObj);
        if (statusObj.status === "connected") {
          localStorage.setItem("loginId", statusObj.user.id);
          this.setState({
            isLogin: true
          });
        } else {
          localStorage.removeItem("loginId");
        }
      }.bind(this)
    );

    //로그인
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
            console.log(res);
            // localStorage.setItem("loginId", res.data.response.id);
            this.setState({
              isLogin: true,
              isOpen: false,
              loading: false
            });
            this.setPostDatas();
          })
          .catch(err => console.log(err));
      },
      fail: err => {
        console.log(err);
      }
    });

    this.setPostDatas();
  }

  actions = {
    onModal: () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    },
    getLogin: () => {
      return this.state.isLogin;
    },
    onLogOut: () => {
      window.Kakao.Auth.logout();
      localStorage.removeItem("loginId");
      this.setState({
        isLogin: false
      });
      this.setPostDatas();
    }
  };

  setPostDatas = async () => {
    const postDatas = await this.callPostDatasApi();
    if (!postDatas) return false;
    this.setState({
      postDatas
    });
  };

  callPostDatasApi = () => {
    console.log(localStorage.getItem("loginId"));

    return axios
      .post("https://mad-server.herokuapp.com/api/post/list", {
        userId: localStorage.getItem("loginId")
      })
      .then(res => res.data)
      .catch(err => console.log(err));
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

// 내보내줍니다.
export { AuthProvider, AuthConsumer };
