import React, { Component, Fragment } from "react";

import { AuthProvider, AuthConsumer } from "../contexts/authContext";
import { MypageProvider } from "../contexts/mypageContext";

// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import MypageContainer from "../containers/mypage/MypageContainer";
import { LoginModal } from "../components/common/Modal";
import LoadingBar from "../components/common/LoadingBar";

interface State {
  isLogin: boolean;
  loading: boolean;
}

class mypage extends Component<{}, State> {
  render() {
    return (
      <AuthProvider>
        <AuthConsumer>
          {({ state, actions }: any) => (
            <Fragment>
              {state.isLoading ? <LoadingBar /> : null}
              <HeaderContainer type="common" state={state} actions={actions} />
              <LoginModal />
              <MypageContainer />
            </Fragment>
          )}
        </AuthConsumer>
      </AuthProvider>
    );
  }
}

export default mypage;
