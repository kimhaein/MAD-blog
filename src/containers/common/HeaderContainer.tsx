import React, { Component, Fragment } from "react";
import { MainHeader, PostHeader } from "../../components/common/Header";

interface Props {
  type: string;
  onModal?: any;
  onLogOut?: any;
}
interface State {
  isLogin: boolean;
}

class HeaderContainer extends Component<Props, State> {
  state: State = {
    isLogin: false
  };
  componentDidMount() {
    const isLogin = localStorage.getItem("loginUser");
    if (isLogin) {
      this.setState({
        isLogin: !this.state.isLogin
      });
    }
  }
  render() {
    const { type, onModal, onLogOut } = this.props;
    return (
      <Fragment>
        {type === "common" ? (
          <MainHeader
            onModal={onModal}
            onLogOut={onLogOut}
            isLogin={this.state.isLogin}
          />
        ) : (
          <PostHeader />
        )}
      </Fragment>
    );
  }
}

export default HeaderContainer;
