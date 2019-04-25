import React, { Component } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteConatiner from "../containers/write/WriteConatiner";
import { WriteProvider } from "../contexts/writeContext";

class Write extends Component<{}, {}> {
  render() {
    return (
      <WriteProvider>
        <HeaderContainer type="post" />
        <WriteConatiner />
      </WriteProvider>
    );
  }
}

export default Write;
