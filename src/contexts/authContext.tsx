import React, { Component, createContext } from "react";
import { KAKAO_API_KEY } from "../key/API_KEY";
import axios from "axios";

const Context = createContext({}); // Context 를 만듭니다.
const { Provider, Consumer: AuthConsumer } = Context;

interface State {
  isOpen: boolean;
  isLogin: boolean;
  loading: boolean;
}

class AuthProvider extends Component<{}, State> {
  constructor(props) {
    super(props);
  }
  state: State = {
    isOpen: false,
    isLogin: false,
    loading: false
  };
  componentDidMount() {
    window.Kakao.init(KAKAO_API_KEY);

    window.Kakao.Auth.getStatus(
      function(statusObj) {
        if (statusObj.status === "connected") {
          console.log(statusObj.status);
          this.setState({
            isLogin: true
          });
        }
      }.bind(this)
    );

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
            localStorage.setItem("loginId", res.data.response.id);
            this.setState({
              isLogin: true,
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
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

// 내보내줍니다.
export { AuthProvider, AuthConsumer };
