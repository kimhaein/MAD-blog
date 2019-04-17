import React, { Component, Fragment } from "react";
// import axios from "axios";
// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import PostContainer from "../containers/post/PostContainer";
import { LoginModal } from "../components/common/Modal";

interface Props {
  data: object;
}

interface State {
  isOpen: boolean;
}

class Index extends Component<Props, State> {
  state: State = {
    isOpen: false
  };

  static async getInitialProps({ req }) {
    // const res: any = await axios.get(
    //   "https://mad-server.herokuapp.com/api/post/list"
    // );
    // console.log(res);
    // const data = res.data;
    // return { data };
  }

  _onModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const data = [
      {
        title: "오늘의 코드 기록 01",
        writer: "김혜인",
        wrDate: "2019-01-03",
        upDate: "2019-01-03",
        contents:
          "Hseded\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\n\n  *[Francesco Agnoletto](https://twitter.com/fragno92)*",
        tag: [
          "프론트개발",
          "자바스크립트",
          "리액트",
          "프론트개발",
          "자바스크립트"
        ],
        likes: 30
      },
      {
        title: "오늘의 코드 기록 02",
        writer: "황윤지",
        wrDate: "2019-01-02",
        upDate: "2019-01-02",
        contents: "# DatePicker The DatePicker works",
        tag: ["백엔드개발", "자바스크립트", "노드"],
        likes: 30
      },
      {
        title: "오늘의 코드 기록 03",
        writer: "김철수",
        wrDate: "2019-01-01",
        upDate: "2019-01-01",
        contents:
          "> 안녕하세요 \n ```javascript \n const a = 1;\n console.log(a); // 1 \n```",
        tag: ["프론트개발", "자바스크립트", "리액트"],
        likes: 30
      }
    ];
    // const { data } = this.props;
    const { isOpen } = this.state;
    return (
      <Fragment>
        <HeaderContainer type="common" onModal={this._onModal} />
        <PostContainer postDatas={data} />
        <LoginModal isOpen={isOpen} onModal={this._onModal} />
      </Fragment>
    );
  }
}

export default Index;
