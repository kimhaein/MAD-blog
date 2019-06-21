import React, { PureComponent } from "react";
import Router from "next/router";
import Write from "../../components/Write";
import CodeView from "../../components/common/CodeView";
import { TagsEdit } from "../../components/common/Tags";

interface Props {
  state: {
    hash: string[];
    isEdit: boolean;
    pno: number;
    contents: string;
    isLogin: boolean;
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
  componentDidMount() {
    const { state, actions } = this.props;
    // 로그인 없이 접근시 메인 화면으로 이동
    if (!state.isLogin) {
      alert("해당페이지의 권한이 없습니다");
      Router.replace("/");
      return false;
    }

    if (state.isEdit) {
      actions.getPostData(state.pno);
    }
  }
  render() {
    const { state, actions } = this.props;
    return (
      <div className="contentsWrap">
        <Write contents={state.contents} setContents={actions.setContents} />
        <CodeView
          markdown={state.contents}
          setContents={actions.setContents}
          type="write"
        />
        <TagsEdit hash={state.hash} setHash={actions.setHash} />
      </div>
    );
  }
}

export default WriteConatiner;
