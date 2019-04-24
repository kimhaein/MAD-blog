import React, { Component, createContext } from "react";
import axios from "axios";
import { KAKAO_API_KEY } from "../key/API_KEY";

const Context = createContext({}); // Context 를 만듭니다.
const { Provider, Consumer: AuthConsumer } = Context;

interface State {
  isOpen: boolean;
  isLogin: boolean;
}

class AuthProvider extends Component<{}, State> {
  state: State = {
    isOpen: false,
    isLogin: false
  };
  componentDidMount() {
    if (localStorage.getItem("loginId")) {
      this.setState({
        isLogin: !this.state.isLogin
      });
    }

    window.Kakao.init(KAKAO_API_KEY);
    window.Kakao.Auth.createLoginButton({
      container: ".kakao-login-btn",
      success: authObj => {
        axios
          .post("https://mad-server.herokuapp.com/kakaologin", {
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            Authorization: `Bearer ${authObj.access_token}`
          })
          .then(res => {
            localStorage.setItem("loginId", res.data.response.id);
            this.setState({
              isLogin: true,
              isOpen: false
            });
          })
          .catch(err => console.log(err));
      },
      fail: err => {
        console.log(err);
      }
    });
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
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    console.log(state);
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

// 내보내줍니다.
export { AuthProvider, AuthConsumer };
