import React, { PureComponent, Fragment } from "react";

import { AuthProvider, AuthConsumer } from "../contexts/authContext";
import { PostProvider } from "../contexts/postContext";

// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import PostContainer from "../containers/post/PostContainer";
import { LoginModal } from "../components/common/Modal";
import LoadingBar from "../components/common/LoadingBar";

interface Props {
  keyword: string;
}

class Index extends PureComponent<Props, {}> {
  static async getInitialProps({ query }: any) {
    return { keyword: query.keyword };
  }
  render() {
    return (
      <AuthProvider>
        <AuthConsumer>
          {({ state, actions }: any) => (
            <Fragment>
              <HeaderContainer type="common" state={state} actions={actions} />
              <PostProvider keyword={this.props.keyword} isLogin={state.isLogin} userId={state.userId} onLoading={actions.onLoading}>
                <PostContainer />
              </PostProvider>
              <LoginModal isModal={state.isModal} onModal={actions.onModal} onLogin={actions.onLogin} />
              {state.isLoading ? <LoadingBar /> : null}
            </Fragment>
          )}
        </AuthConsumer>
      </AuthProvider>
    );
  }
}

export default Index;
