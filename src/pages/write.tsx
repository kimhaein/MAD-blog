import React, { PureComponent, Fragment } from "react";
import { AuthProvider, AuthConsumer } from "../contexts/authContext";
import { WriteProvider, WriteConsumer } from "../contexts/writeContext";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteConatiner from "../containers/write/WriteConatiner";
import LoadingBar from "../components/common/LoadingBar";

interface Props {
  mode: string;
  pno: number;
  isLogin: boolean;
}

class Write extends PureComponent<Props, {}> {
  static async getInitialProps({ query }: any) {
    return { mode: query.mode, pno: query.pno };
  }

  render() {
    const { mode, pno } = this.props;
    return (
      <AuthProvider>
        <AuthConsumer>
          {({ state }: any) => (
            <WriteProvider userId={state.userId} mode={mode} pno={pno}>
              <WriteConsumer>
                {({ state, actions }: any) => (
                  <Fragment>
                    {state.isLoading ? <LoadingBar /> : null}
                    <HeaderContainer
                      state={state}
                      actions={actions}
                      type="write"
                    />
                    <WriteConatiner state={state} actions={actions} />
                  </Fragment>
                )}
              </WriteConsumer>
            </WriteProvider>
          )}
        </AuthConsumer>
      </AuthProvider>
    );
  }
}

export default Write;
