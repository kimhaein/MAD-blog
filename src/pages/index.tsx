import React, { Component, Fragment } from "react";
// import axios from "axios";
// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import PostContainer from "../containers/post/PostContainer";
import { LoginModal } from "../components/common/Modal";

interface State {
  isOpen: boolean;
}

class Index extends Component<{}, State> {
  state: State = {
    isOpen: false
  };

  _onModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <Fragment>
        <HeaderContainer type="common" onModal={this._onModal} />
        <PostContainer />
        <LoginModal isOpen={isOpen} onModal={this._onModal} />
      </Fragment>
    );
  }
}

export default Index;
