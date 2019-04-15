import React, { Component } from "react";
import Write from "../../components/write";
import CodeView from "../../components/common/CodeView";
import { WriteProvider } from "../../contexts/writeContext";

class WriteConatiner extends Component {
  render() {
    return (
      <WriteProvider>
        <div className="contentsWrap">
          <Write />
          <CodeView />
        </div>
      </WriteProvider>
    );
  }
}

export default WriteConatiner;
