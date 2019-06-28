import React, { Component, Fragment } from "react";

import { AuthProvider, AuthConsumer } from "../contexts/authContext";

// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import MypageContainer from "../containers/mypage/MypageContainer";
import { LoginModal } from "../components/common/Modal";
import LoadingBar from "../components/common/LoadingBar";

interface State {
  isLoading: boolean;
}
class mypage extends Component<{}, State> {
  state: State = {
    isLoading: false
  };

  onLoading = (state = !this.state.isLoading) => {
    this.setState({
      isLoading: state
    });
  };

  render() {
    return (
      <AuthProvider onLoading={this.onLoading}>
        <AuthConsumer>
          {({ state, actions }: any) => (
            <Fragment>
              {console.log(11111, state.isLogin)}
              {this.state.isLoading ? <LoadingBar /> : null}
              <HeaderContainer type="common" state={state} actions={actions} />
              <MypageContainer isLogin={state.isLogin} userId={state.userId} onLoading={this.onLoading} />
              <LoginModal isModal={state.isModal} onModal={state.onModal} onLogin={state.onLogin} />
            </Fragment>
          )}
        </AuthConsumer>
      </AuthProvider>
    );
  }
}

export default mypage;
