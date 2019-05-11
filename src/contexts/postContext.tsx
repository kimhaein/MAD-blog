/**
 * 게시글 관련 context
 */
import React, { Component, createContext } from "react";
import moment from "moment";
import axios from "axios";

//Context 생성
const Context = createContext({});
const { Provider, Consumer: PostConsumer } = Context;

/**
 * postDatas: post 관련 json 데이터
 * postCnt: 보여줄 post 갯수
 * isMoreBtn: 더보기 display 여부
 * keyword: 검색 조건
 * onDelete: post 삭제 이벤트 (pno : post id)
 * onLike: post 좋아요 이벤트 (pno : post id)
 * offLike: post 좋아요 취소 이벤트 (pno : post id)
 * onMore: 더보기 이벤트
 * onSearch: 검색 이벤트 (e : 이벤트 객체)
 */

interface Props {
  postDatas: Array<object>;
}

interface State {
  postDatas: Array<object>;
  postCnt: number;
  isMoreBtn: Boolean;
  keyword: string;
}

class PostProvider extends Component<Props, State> {
  state: State = {
    postDatas: [],
    postCnt: 4,
    isMoreBtn: false,
    keyword: ""
  };

  actions = {
    onDelete: pno => {
      axios
        .post("https://mad-server.herokuapp.com/api/post/del", {
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          pno,
          writer: localStorage.getItem("loginId"),
          upDate: moment().format("YYYY-MM-DD H:mm:ss")
        })
        .then(res => {
          this.getPostDatas();
        })
        .catch(err => console.log(err));
    },
    onLike: pno => {
      axios
        .post("https://mad-server.herokuapp.com/api/like", {
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          pno,
          userId: localStorage.getItem("loginId")
        })
        .then(res => {
          this.getPostDatas();
        })
        .catch(err => console.log(err));
    },
    offLike: pno => {
      // console.log("@offLike");
      axios
        .post("https://mad-server.herokuapp.com/api/unlike", {
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          pno,
          userId: localStorage.getItem("loginId")
        })
        .then(res => {
          this.getPostDatas();
        })
        .catch(err => console.log(err));
    },
    onMore: () => {
      this.setState(
        {
          postCnt: this.state.postCnt + 4
        },
        () => {
          this.getPostDatas();
        }
      );
    },
    onSearch: e => {
      const target = e.target;
      const keyword = target.value ? target.value : target.dataset.keyword;
      this.setState({ keyword }, () => {
        this.getPostDatas();
      });
    }
  };

  //componentWillReceiveProps:컴포넌트가 prop 을 새로 받았을 때 실행
  componentWillReceiveProps(nextProps) {
    this.setState({
      postDatas: nextProps.postDatas,
      isMoreBtn: true
    });
  }

  /**
   * posts 관련 json 데이터 state 저장
   */
  getPostDatas = async () => {
    const postDatas = await this.callPostDatasApi();
    if (!postDatas) return false;
    this.setState({
      postDatas: postDatas.post,
      isMoreBtn:
        this.state.postCnt >= postDatas.totalPost.totalCnt ? false : true
    });
  };

  /**
   * posts 관련 데이터 조회
   */
  callPostDatasApi = () => {
    return axios
      .post("https://mad-server.herokuapp.com/api/post/list", {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        userId: localStorage.getItem("loginId"),
        page: this.state.postCnt,
        search: this.state.keyword
      })
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { PostProvider, PostConsumer };
