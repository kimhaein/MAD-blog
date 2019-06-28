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
interface State {
  isLoading: boolean;
}

class Index extends PureComponent<Props, State> {
  static async getInitialProps({ query }: any) {
    return { keyword: query.keyword };
  }

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
              <HeaderContainer type="common" state={state} actions={actions} />
              <PostProvider keyword={this.props.keyword} isLogin={state.isLogin} userId={state.userId} onLoading={this.onLoading}>
                <PostContainer />
              </PostProvider>
              <LoginModal isModal={state.isModal} onModal={actions.onModal} onLogin={actions.onLogin} />
              {this.state.isLoading ? <LoadingBar /> : null}
            </Fragment>
          )}
        </AuthConsumer>
      </AuthProvider>
    );
  }
}

export default Index;
