import React, { PureComponent } from "react";
import axios from "axios";
import { PostConsumer } from "../../contexts/postContext";
import Search from "../../components/common/Search";
import Post from "../../components/post";
import { MoreBtn } from "../../components/common/Button";

interface Props {
  postDatas: object[];
  getPostDatas(): void;
  isLogin: boolean;
}

interface State {
  hashLank: Array<string>;
}

class PostWrap extends PureComponent<Props, State> {
  state: State = {
    hashLank: []
  };

  componentDidMount() {
    this.getHashLank();
  }

  //post 데이터 가져오기
  getHashLank = async () => {
    const hashLank = await this.callHashLankApi();
    if (!hashLank) return false;
    this.setState({
      hashLank: hashLank.split(",")
    });
  };

  //API 호출
  callHashLankApi = () => {
    return axios
      .get("https://mad-server.herokuapp.com/api/hash/rank")
      .then(({ data }) => {
        return data.rankHash.rankHash;
      })
      .catch((err: object) => console.log(err));
  };

  render() {
    return (
      <div className="contentsWrap mainWrap">
        <div className="postWrap">
          <Search tagDatas={this.state.hashLank} />
          <Post postDatas={this.props.postDatas} />
          <MoreBtn />
        </div>
      </div>
    );
  }
}

const PostContainer = () => (
  <PostConsumer>
    {({ state, actions }: any) => (
      <PostWrap
        postDatas={state.postDatas}
        getPostDatas={actions.getPostDatas}
        isLogin={state.isLogin}
      />
    )}
  </PostConsumer>
);

export default PostContainer;
