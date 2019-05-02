import React, { Component } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteConatiner from "../containers/write/WriteConatiner";
import { WriteProvider } from "../contexts/writeContext";

interface Props {
  mode: string;
  pno: string;
}
class Write extends Component<Props, {}> {
  static async getInitialProps({ query }) {
    return { mode: query.mode, pno: query.pno };
  }
  render() {
    return (
      <WriteProvider mode={this.props.mode} pno={this.props.pno}>
        <HeaderContainer type="post" />
        <WriteConatiner />
      </WriteProvider>
    );
  }
}

export default Write;
