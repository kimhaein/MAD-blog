import React, { Component } from "react";
import Header from "../../components/common/Header/Header";

interface Props {}

interface State {}

class HeaderContainer extends Component<Props, State> {
  state: State = {};

  render() {
    return (
      <div>
        <Header />
        <img src="/static/images/test.jpg" alt="my image" />
      </div>
    );
  }
}

export default HeaderContainer;
