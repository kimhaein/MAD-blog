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
 * setLoading : 로딩 처리 이벤트
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
  isLogin: boolean;
  keyword?: string | undefined;
  userId: string;
  onLoading(state: boolean): void;
}

interface State {
  postDatas: object[];
  isLogin: Boolean;
  userId: string;
  postCnt: number;
  isMoreBtn: Boolean;
  keyword: string | undefined;
}

class PostProvider extends Component<Props, State> {
  state: State = {
    isLogin: false,
    isMoreBtn: false,
    postDatas: [],
    userId: "",
    postCnt: 4,
    keyword: ""
  };

  actions = {
    onDelete: (pno: number) => {
      this.props.onLoading(true);
      axios
        .post("https://mad-server.herokuapp.com/api/post/del", {
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          pno,
          writer: this.state.userId,
          upDate: moment().format("YYYY-MM-DD H:mm:ss")
        })
        .then(res => {
          this.actions.getPostDatas();
        })
        .catch(err => console.log(err));
    },
    onLike: (pno: number) => {
      this.props.onLoading(true);
      axios
        .post("https://mad-server.herokuapp.com/api/like", {
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          pno,
          userId: this.state.userId
        })
        .then(res => {
          this.actions.getPostDatas();
        })
        .catch(err => console.log(err));
    },
    offLike: (pno: number) => {
      this.props.onLoading(true);
      axios
        .post("https://mad-server.herokuapp.com/api/unlike", {
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          pno,
          userId: this.state.userId
        })
        .then(() => {
          this.actions.getPostDatas();
        })
        .catch(err => console.log(err));
    },
    onMore: () => {
      this.props.onLoading(true);
      this.setState(
        {
          postCnt: this.state.postCnt + 4
        },
        () => {
          this.actions.getPostDatas();
        }
      );
    },
    onSearch: (e: Event) => {
      this.props.onLoading(true);
      const target = e.target as HTMLInputElement;
      const keyword: string | undefined = target.value ? target.value : target.dataset.keyword ? target.dataset.keyword : target.innerHTML;
      this.setState({ keyword }, () => {
        this.actions.getPostDatas();
      });
    },
    getPostDatas: async () => {
      console.log("getPostDatas");
      const { postCnt, keyword, userId } = this.state;
      return axios
        .post("https://mad-server.herokuapp.com/api/post/list", {
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          userId: userId,
          page: postCnt,
          search: keyword
        })
        .then(({ data }) => {
          this.setState({
            isMoreBtn: this.state.postCnt >= data.totalPost.totalCnt ? false : true,
            postDatas: data.post
          });
          this.props.onLoading(false);
        })
        .catch(err => console.log(err));
    }
  };

  constructor(props: Props) {
    super(props);
    this.state = { ...this.state, keyword: this.props.keyword };
    this.actions.getPostDatas();
  }

  shouldComponentUpdate(nextProps: Props) {
    //isLogin 값이 변경 됐을 때 만 실행
    if (this.props.isLogin !== nextProps.isLogin) {
      this.setState(
        {
          isLogin: nextProps.isLogin,
          userId: nextProps.userId
        },
        () => {
          this.actions.getPostDatas();
        }
      );
    }
    return true;
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { PostProvider, PostConsumer };
