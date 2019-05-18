import React, { Component, Fragment } from "react";
import Router from "next/router";
import { AuthProvider } from "../contexts/authContext";
import HeaderContainer from "../containers/common/HeaderContainer";
import LoadingBar from "../components/common/LoadingBar";
import { LoginModal } from "../components/common/Modal";

interface State {
  isLogin: boolean;
  loading: boolean;
}

class Chart extends Component<{}, State> {
  state: State = {
    isLogin: false,
    loading: false
  };

  componentDidMount() {
    // 로그인 없이 접근시 메인 화면으로 이동
    if (!localStorage.getItem("loginId")) {
      alert("해당 페이지의 권한이 없습니다");
      Router.replace("/");
      return false;
    }
  }

  setIsLogin = (isLogin: boolean = false) => {
    this.setState({ isLogin });
  };

  setLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    const { isLogin, loading } = this.state;
    return (
      <Fragment>
        <AuthProvider setIsLogin={this.setIsLogin} setLoading={this.setLoading}>
          {loading ? <LoadingBar /> : null}
          <HeaderContainer type="common" />
          <LoginModal />
        </AuthProvider>
      </Fragment>
    );
  }
}

export default Chart;
