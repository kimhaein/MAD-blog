import React, { Component, createContext } from "react";
import moment from "moment";
import axios from "axios";

const Context = createContext({}); // Context 를 만듭니다.
const { Provider, Consumer: PostConsumer } = Context;

interface Props {
  postDatas: Array<object>;
}

interface State {
  postDatas: Array<object>;
  page: number;
  isMoreBtn: Boolean;
  keyword: string;
}

class PostProvider extends Component<Props, State> {
  state: State = {
    postDatas: [],
    page: 4,
    isMoreBtn: false,
    keyword: ""
  };

  actions = {
    onDelete: pno => {
      // console.log("@onDelete");
      axios
        .post("https://mad-server.herokuapp.com/api/post/del", {
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          pno,
          writer: localStorage.getItem("loginId"),
          upDate: moment().format("YYYY-MM-DD H:mm:ss")
        })
        .then(res => {
          // console.log("@onDelete", res);
          this.getPostDatas();
        })
        .catch(err => console.log(err));
    },
    onLike: pno => {
      // console.log("@onLike");
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
          page: this.state.page + 4
        },
        () => {
          this.getPostDatas();
        }
      );
    },
    onSearch: e => {
      this.setState(
        {
          keyword: e.target.value
        },
        () => {
          this.getPostDatas();
        }
      );
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      postDatas: nextProps.postDatas,
      isMoreBtn: true
    });
  }

  //post 데이터 가져오기
  getPostDatas = async () => {
    // console.log("2.getPostDatas - userId :", localStorage.getItem("loginId"));
    const postDatas = await this.callPostDatasApi();
    if (!postDatas) return false;
    this.setState({
      postDatas: postDatas.post,
      isMoreBtn: this.state.page >= postDatas.totalPost.totalCnt ? false : true
    });
  };

  //post API 호출
  callPostDatasApi = () => {
    return axios
      .post("https://mad-server.herokuapp.com/api/post/list", {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        userId: localStorage.getItem("loginId"),
        page: this.state.page,
        search: this.state.keyword
      })
      .then(res => {
        // console.log("3.callPostDatasApi :", res.data);
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
