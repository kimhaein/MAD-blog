import React, { Component, Fragment } from "react";

import { AuthProvider, AuthConsumer } from "../contexts/authContext";
import { PostProvider } from "../contexts/postContext";

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
              <MypageContainer isLogin={state.isLogin} userId={state.userId} />
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
