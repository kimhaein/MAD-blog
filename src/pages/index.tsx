import React, { Component, Fragment } from "react";

import { AuthProvider } from "../contexts/authContext";
import { PostProvider } from "../contexts/postContext";

// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import PostContainer from "../containers/post/PostContainer";
import { LoginModal } from "../components/common/Modal";

interface State {
  postDatas: Array<object>;
}

class Index extends Component<{}, State> {
  state: State = {
    postDatas: []
  };

  postDatas = postDatas => {
    this.setState({
      postDatas
    });
  };

  render() {
    return (
      <Fragment>
        <AuthProvider postDatas={this.postDatas}>
          <HeaderContainer type="common" />
          <LoginModal />
          <PostProvider postDatas={this.state.postDatas}>
            <PostContainer />
          </PostProvider>
        </AuthProvider>
      </Fragment>
    );
  }
}

export default Index;
