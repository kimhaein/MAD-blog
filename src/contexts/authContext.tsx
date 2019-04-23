import React, { Component, createContext } from "react";

const Context = createContext({}); // Context 를 만듭니다.
const { Provider, Consumer: AuthConsumer } = Context;

interface State {
  isLogin: boolean;
}

class AuthProvider extends Component<{}, State> {
  state = {
    isLogin: false
  };

  actions = {
    setLogin: () => {
      if (localStorage.getItem("LoginUser")) {
        this.setState({
          isLogin: !this.state.isLogin
        });
      }
    },
    getLogin: () => {
      return this.state.isLogin;
    },
    onLogOut: () => {
      window.Kakao.Auth.logout();
      localStorage.removeItem("loginUser");
      localStorage.removeItem("loginEmail");
      localStorage.removeItem("loginId");

      this.setState({
        isLogin: !this.state.isLogin
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
