import React, { Component } from "react";
import Link from "next/link";

interface Props {}

interface State {}

class Index extends Component<Props, State> {
  state: State = {};

  render() {
    return (
      <div>
        <Link href="/about"> 어바웃</Link>
        <Link href="/ssr-test"> 어바웃</Link>
      </div>
    );
  }
}

export default Index;
