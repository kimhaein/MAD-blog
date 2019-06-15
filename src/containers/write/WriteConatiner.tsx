import React, { PureComponent } from "react";
import { WriteConsumer } from "../../contexts/writeContext";
import Write from "../../components/Write";
import CodeView from "../../components/common/CodeView";
import { TagsEdit } from "../../components/common/Tags";

interface Props {
  state: {
    hash: string[];
  };
  actions: {
    setHash(): void;
  };
}
class WriteConatiner extends PureComponent<Props, {}> {
  render() {
    const { state, actions } = this.props;
    return (
      <div className="contentsWrap">
        <Write />
        <CodeView />
        <TagsEdit hash={state.hash} setHash={actions.setHash} />
      </div>
    );
  }
}

export default WriteConatiner;
