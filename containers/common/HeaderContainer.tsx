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
      </div>
    );
  }
}

export default HeaderContainer;
