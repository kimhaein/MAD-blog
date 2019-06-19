import React, { Component, Fragment } from "react";

import { AuthProvider, AuthConsumer } from "../contexts/authContext";
import { MypageProvider } from "../contexts/mypageContext";

// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import MypageContainer from "../containers/mypage/MypageContainer";
import { LoginModal } from "../components/common/Modal";
import LoadingBar from "../components/common/LoadingBar";

class mypage extends Component {
  render() {
    return (
      <AuthProvider>
        <AuthConsumer>
          {({ state, actions }: any) => (
            <Fragment>
              {state.isLoading ? <LoadingBar /> : null}
              <HeaderContainer type="common" state={state} actions={actions} />
              <MypageContainer />
              <LoginModal
                isModal={state.isModal}
                onModal={state.onModal}
                onLogin={state.onLogin}
              />
            </Fragment>
          )}
        </AuthConsumer>
      </AuthProvider>
    );
  }
}

export default mypage;
