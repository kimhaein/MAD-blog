import React, { Component } from "react";
import { WriteConsumer } from "../../../contexts/writeContext";
import marked from "marked";
import "./codeView.css";

// prism 관련 코드 불러오기
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
require("prismjs/components/prism-bash.min.js");
require("prismjs/components/prism-javascript.min.js");
require("prismjs/components/prism-jsx.min.js");
require("prismjs/components/prism-css.min.js");

interface Props {
  markdown: string;
  setContents?(value: string): void;
  type: string;
}
interface State {
  html: string;
}

export class CodeView extends Component<Props, State> {
  state: State = {
    html: this.props.markdown
      ? marked(this.props.markdown, { breaks: true, sanitize: true })
      : ""
  };
  _renderMarkdown = () => {
    const { markdown } = this.props;

    if (!markdown) {
      this.setState({ html: "" });
      return;
    }
    this.setState({
      html: marked(markdown, {
        breaks: true, // 일반 엔터로 새 줄 입력
        sanitize: true // 마크다운 내부 html 무시
      })
    });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.markdown !== this.props.markdown) {
      this._renderMarkdown();
    }

    if (prevState.html !== this.state.html) {
      Prism.highlightAll();
    }
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const { html } = this.state;
    const { type } = this.props;
    const markup = {
      __html: html
    };

    return (
      <div className={`codeView ${type}`} dangerouslySetInnerHTML={markup} />
    );
  }
}

export default CodeView;
