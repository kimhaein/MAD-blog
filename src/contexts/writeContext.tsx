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
  mode: string;
  pno: string;
  setLoading: any;
}

interface State {
  pno: string;
  isEdit: boolean;
  title: string;
  contents: string;
  hash: Array<string>;
  beforeHash: Array<string>;
}

class WriteProvider extends Component<Props, State> {
  state: State = {
    pno: "",
    isEdit: false,
    title: "",
    contents: "",
    hash: [],
    beforeHash: []
  };

  componentDidMount() {
    // 로그인 없이 접근시 메인 화면으로 이동
    if (!localStorage.getItem("loginId")) {
      Router.replace("/");
      return false;
    }

    // 수정 모드 일 경우 해당 게시글 데이터 조회
    if (this.props.mode == "edit") {
      this.getPostData(this.props.pno);
      this.setState({
        pno: this.props.pno
      });
    }
  }

  actions = {
    setTitle: title => {
      this.setState({ title });
    },
    setContents: contents => {
      this.setState({ contents });
    },
    setHash: hash => {
      this.setState({ hash });
    },
    onSubmitPost: () => {
      if (this.state.title === "" || this.state.contents === "") {
        alert("title 혹은 contents를 작성해주세요");
        return false;
      }

      const hash = this.state.hash.toString();

      //post 등록
      axios
        .post("https://mad-server.herokuapp.com/api/post", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          title: this.state.title,
          contents: this.state.contents,
          wrDate: moment().format("YYYY-MM-DD H:mm:ss"),
          writer: localStorage.getItem("loginId"),
          hash: hash
        })
        .then(res => {
          // 등롣 완료시 메인화면으로 이동
          Router.replace("/");
        });
    },
    onEdit: () => {
      let delHash = this.state.beforeHash.filter(
        tag => !this.state.hash.includes(tag)
      );

      let addHash = this.state.hash.filter(
        tag => !this.state.beforeHash.includes(tag)
      );

      axios
        .post("https://mad-server.herokuapp.com/api/post/edit", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          pno: this.state.pno,
          title: this.state.title,
          contents: this.state.contents,
          upDate: moment().format("YYYY-MM-DD H:mm:ss"),
          writer: localStorage.getItem("loginId"),
          delHash: delHash.toString(),
          addHash: addHash.toString()
        })
        .then(res => {
          // 수정 완료시 메인화면으로 이동
          Router.replace("/");
        });
    }
  };

  /**
   * [수정] 해당 post 데이터 조회
   * @param {string} pno 게시글 id
   */
  getPostData = pno => {
    this.props.setLoading();
    axios
      .post("https://mad-server.herokuapp.com/api/post/contents", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        pno,
        userId: localStorage.getItem("loginId")
      })
      .then(res => {
        const hashArr = res.data.getContent[0].hashes
          ? res.data.getContent[0].hashes.split(",")
          : [];
        this.setState({
          isEdit: true,
          title: res.data.getContent[0].title,
          contents: res.data.getContent[0].contents,
          hash: hashArr,
          beforeHash: hashArr
        });
        this.props.setLoading();
      });
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { WriteProvider, WriteConsumer };
