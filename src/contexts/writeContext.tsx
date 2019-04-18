import React, { Component, createContext } from "react";

const Context = createContext({}); // Context 를 만듭니다.
const { Provider, Consumer: WriteConsumer } = Context;
class WriteProvider extends Component {
  state = {
    titl: "",
    contents: "# 1234"
  };

  actions = {
    setContents: contents => {
      this.setState({ contents });
    },
    setTitle: title => {
      this.setState({ title });
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

// 내보내줍니다.
export { WriteProvider, WriteConsumer };
