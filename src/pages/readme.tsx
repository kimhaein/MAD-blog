import React, { PureComponent, Fragment } from "react";
import { AuthProvider } from "../contexts/authContext";
import HeaderContainer from "../containers/common/HeaderContainer";
import LoadingBar from "../components/common/LoadingBar";
import { LoginModal } from "../components/common/Modal";

interface State {
  isLogin: boolean;
  loading: boolean;
}

class readme extends PureComponent<{}, State> {
  state: State = {
    isLogin: false,
    loading: false
  };

  render() {
    const { isLogin, loading } = this.state;
    return (
      <Fragment>
        <AuthProvider>
          {loading ? <LoadingBar /> : null}
          <HeaderContainer type="common" />
          <LoginModal />
          {`read ME`}
        </AuthProvider>
      </Fragment>
    );
  }
}

export default readme;
