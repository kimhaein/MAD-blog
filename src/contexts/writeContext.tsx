/**
 * 게시글 작성 및 수정 관련 context
 */
import React, { Component, createContext } from "react";
import Router from "next/router";
import moment from "moment";
import axios from "axios";

//Context 생성
const Context = createContext({});
const { Provider, Consumer: WriteConsumer } = Context;

/**
 * mode: 현재 write Component의 모드 (edit:수정)
 * setLoading : 로딩 처리 이벤트
 * pno: post id (수정)
 * isEdit: 수정 모드 여부 (수정)
 * title: post 제목 (등록/수정)
 * contents: post 내용 (등록/수정)
 * hash: post 해시태그 (등록/수정)
 * beforeHash: 수정전 해시 태그 (수정)
 * setTitle: post 제목 설정 이벤트 (등록)
 * setContents: post 내용 설정 이벤트 (등록)
 * setHash: post 해시태그 설정 이벤트 (등록)
 * onSubmitPost: post 등록 이벤트 (등록)
 * onEdit: post 수정 이벤트 (수정)
 */

interface Props {
  pno: number;
  mode: string;
  userId: string;
}

interface State {
  pno: number;
  mode: string;
  userId: string;
  isEdit: boolean;
  title: string;
  contents: string;
  hash: string[];
  beforeHash: string[];
}

class WriteProvider extends Component<Props, State> {
  state: State = {
    pno: 0,
    mode: "",
    userId: "",
    isEdit: false,
    title: "",
    contents: "",
    hash: [],
    beforeHash: []
  };

  actions = {
    setTitle: (title: string) => {
      this.setState({ title });
    },
    setContents: (contents: string) => {
      this.setState({ contents });
    },
    setHash: (hash: Array<string>) => {
      this.setState({ hash });
    },
    onSubmitPost: () => {
      const { title, contents, hash, userId } = this.state;
      if (title === "" || contents === "") {
        alert("title 혹은 contents를 작성해주세요");
        return false;
      }
      const hashStr = hash.toString();

      //post 등록
      axios
        .post("https://mad-server.herokuapp.com/api/post", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          title: title,
          contents: contents,
          wrDate: moment().format("YYYY-MM-DD H:mm:ss"),
          writer: userId,
          hash: hashStr
        })
        .then(res => {
          // 등록 완료시 메인화면으로 이동
          Router.replace("/");
        });
    },
    onEdit: () => {
      const { beforeHash, hash, pno, title, contents } = this.state;
      let delHash = beforeHash.filter(tag => !hash.includes(tag));
      let addHash = hash.filter(tag => !beforeHash.includes(tag));
      axios
        .post("https://mad-server.herokuapp.com/api/post/edit", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          pno,
          title,
          contents,
          upDate: moment().format("YYYY-MM-DD H:mm:ss"),
          writer: this.state.userId,
          delHash: delHash.toString(),
          addHash: addHash.toString()
        })
        .then(() => {
          // 수정 완료시 메인화면으로 이동
          Router.replace("/");
        });
    },
    getPostData: (pno: number) => {
      axios
        .post("https://mad-server.herokuapp.com/api/post/contents", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          pno,
          userId: this.state.userId
        })
        .then(({ data }) => {
          const hashArr = data.getContent[0].hashes
            ? data.getContent[0].hashes.split(",")
            : [];
          this.setState({
            isEdit: true,
            title: data.getContent[0].title,
            contents: data.getContent[0].contents,
            hash: hashArr,
            beforeHash: hashArr
          });
        });
    }
  };

  componentWillReceiveProps(nextProps: Props) {
    const { userId, pno, mode } = nextProps;
    this.setState({ userId }, () => {
      if (mode === "edit") {
        this.actions.getPostData(pno);
        this.setState({ isEdit: true, pno });
      }
    });
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { WriteProvider, WriteConsumer };
