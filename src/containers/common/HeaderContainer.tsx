import React, { Component } from "react";
import { MainHeader, PostHeader } from "../../components/common/Header";
import { AuthConsumer } from "../../contexts/authContext";
import { WriteConsumer } from "../../contexts/writeContext";

interface Props {
  type: string;
}

class HeaderContainer extends Component<Props, {}> {
  render() {
    const { type } = this.props;
    return type === "common" ? (
      <AuthConsumer>
        {({ state, actions }: any) => (
          <MainHeader state={state} actions={actions} />
        )}
      </AuthConsumer>
    ) : (
      <WriteConsumer>
        {({ state, actions }: any) => (
          <PostHeader state={state} actions={actions} />
        )}
      </WriteConsumer>
    );
  }
}

export default HeaderContainer;
