import React, { Component } from "react";
import { WriteConsumer } from "../../contexts/writeContext";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./write.css";
// CodeMirror를 위한 CSS 스타일
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

interface Props {
  value: string;
  setValue: any;
}
interface State {
  markdown: string;
}

class Editor extends Component<Props, State> {
  state: State = {
    markdown: "# 1234"
  };

  render() {
    return (
      <div className="editor">
        <CodeMirror
          value={this.state.markdown}
          options={{
            mode: "xml",
            theme: "material",
            lineNumbers: true
          }}
          onBeforeChange={(editor, data, value) => {
            this.setState({
              markdown: value
            });
            this.props.setValue(this.state.markdown);
          }}
        />
      </div>
    );
  }
}

const Write = () => (
  <WriteConsumer>
    {({ state, actions }: any) => (
      <Editor value={state.value} setValue={actions.setValue} />
    )}
  </WriteConsumer>
);

export default Write;
