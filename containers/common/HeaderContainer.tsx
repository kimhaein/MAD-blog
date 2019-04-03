import React, { Component } from "react";
import Link from "next/link";

interface Props {}

interface State {}

class HeaderContainer extends Component<Props, State> {
  state: State = {};

  render() {
    return (
      <div>
        <Link href="/write">
          <a>Write</a>
        </Link>
      </div>
    );
  }
}

export default HeaderContainer;
