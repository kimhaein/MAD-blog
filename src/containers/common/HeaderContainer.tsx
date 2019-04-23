import React, { Component, Fragment } from "react";
import { MainHeader, PostHeader } from "../../components/common/Header";

interface Props {
  type: string;
  onModal?: any;
  onLogOut?: any;
}

class HeaderContainer extends Component<Props, {}> {
  render() {
    const { type, onModal, onLogOut } = this.props;
    return (
      <Fragment>
        {type === "common" ? (
          <MainHeader onModal={onModal} onLogOut={onLogOut} />
        ) : (
          <PostHeader />
        )}
      </Fragment>
    );
  }
}

export default HeaderContainer;
