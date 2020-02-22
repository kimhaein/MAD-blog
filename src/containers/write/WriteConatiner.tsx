import React, { PureComponent } from "react";
import Write from "../../components/write";
import CodeView from "../../components/common/CodeView";
import { TagsEdit } from "../../components/common/Tags";

interface Props {
  state: {
    hash: string[];
    isEdit: boolean;
    pno: number;
    contents: string;
    userId: number;
  };
  actions: {
    setHash(): void;
    setContents(): void;
    getPostData(pno: number): void;
    onSubmitPost(): void;
    onEdit(): void;
  };
}
class WriteConatiner extends PureComponent<Props, {}> {
  render() {
    const { state, actions } = this.props;
    console.log(1, state.contents);
    return (
      <div className="contentsWrap">
        <Write contents={state.contents} setContents={actions.setContents} />
        <CodeView markdown={state.contents} setContents={actions.setContents} type="write" />
        <TagsEdit hash={state.hash} setHash={actions.setHash} />
      </div>
    );
  }
}

export default WriteConatiner;
