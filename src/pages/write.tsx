import React, { Component } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteConatiner from "../containers/write/WriteConatiner";
import { WriteProvider } from "../contexts/writeContext";

class Write extends Component<{}, {}> {
  static async getInitialProps({ query }) {
    return { mode: query.mode };
  }
  render() {
    return (
      <WriteProvider mode={this.props.mode}>
        <HeaderContainer type="post" />
        <WriteConatiner />
      </WriteProvider>
    );
  }
}

export default Write;
