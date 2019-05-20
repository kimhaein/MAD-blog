import React, { Component, Fragment } from "react";
import { AuthProvider } from "../contexts/authContext";
import HeaderContainer from "../containers/common/HeaderContainer";
import TrendContainer from "../containers/trend/TrendContainer";
import LoadingBar from "../components/common/LoadingBar";
import { LoginModal } from "../components/common/Modal";

interface State {
  isLogin: boolean;
  loading: boolean;
}

class Trend extends Component<{}, State> {
  state: State = {
    isLogin: false,
    loading: false
  };

  setIsLogin = (isLogin: boolean = false) => {
    this.setState({ isLogin });
  };

  setLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    const { loading } = this.state;
    return (
      <Fragment>
        <AuthProvider setIsLogin={this.setIsLogin} setLoading={this.setLoading}>
          {loading ? <LoadingBar /> : null}
          <HeaderContainer type="common" />
          <TrendContainer />
          <LoginModal />
        </AuthProvider>
      </Fragment>
    );
  }
}

export default Trend;