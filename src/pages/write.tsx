import React, { Component, Fragment } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteConatiner from "../containers/write/WriteConatiner";

interface Props {
  router: object;
}

interface State {}

class Write extends Component<Props, State> {
  state: State = {};

  render() {
    return (
      <Fragment>
        <HeaderContainer type="post" />
        <WriteConatiner />
      </Fragment>
    );
  }
}

export default Write;
