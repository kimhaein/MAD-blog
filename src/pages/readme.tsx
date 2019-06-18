import React, { PureComponent, Fragment } from "react";
import { AuthProvider, AuthConsumer } from "../contexts/authContext";
import HeaderContainer from "../containers/common/HeaderContainer";
import LoadingBar from "../components/common/LoadingBar";
import { LoginModal } from "../components/common/Modal";

interface State {
  isLogin: boolean;
  loading: boolean;
}

class readme extends PureComponent<{}, State> {
  render() {
    return (
      <AuthProvider>
        <AuthConsumer>
          {({ state, actions }: any) => (
            <Fragment>
              {state.isLoading ? <LoadingBar /> : null}
              <HeaderContainer type="common" state={state} actions={actions} />
              <LoginModal />
              {`read ME`}
            </Fragment>
          )}
        </AuthConsumer>
      </AuthProvider>
    );
  }
}

export default readme;
