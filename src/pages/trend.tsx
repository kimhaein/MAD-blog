import React, { PureComponent, Fragment } from "react";
import { AuthProvider, AuthConsumer } from "../contexts/authContext";
import HeaderContainer from "../containers/common/HeaderContainer";
import TrendContainer from "../containers/trend/TrendContainer";
import LoadingBar from "../components/common/LoadingBar";
import { LoginModal } from "../components/common/Modal";

interface State {
  isLogin: boolean;
  loading: boolean;
}

class Trend extends PureComponent<{}, State> {
  render() {
    return (
      <AuthProvider>
        <AuthConsumer>
          {({ state, actions }: any) => (
            <Fragment>
              {state.isLoading ? <LoadingBar /> : null}
              <HeaderContainer type="common" state={state} actions={actions} />
              <LoginModal
                isModal={state.isModal}
                onModal={state.onModal}
                onLogin={state.onLogin}
              />
              <TrendContainer />
            </Fragment>
          )}
        </AuthConsumer>
      </AuthProvider>
    );
  }
}

export default Trend;
