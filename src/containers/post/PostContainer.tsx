import React, { Component } from "react";
import axios from "axios";
import { PostConsumer } from "../../contexts/postContext";
import Search from "../../components/common/Search";
import Post from "../../components/post";
import { MoreBtn } from "../../components/common/Button";

interface State {
  hashLank: Array<string>;
}

class PostContainer extends Component<{}, State> {
  state: State = {
    hashLank: []
  };

  componentDidMount() {
    this.getHashLank();
    // this.callTest();
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

  //TEST getPrams
  // callTest = () => {
  //   return axios
  //     .get("https://mad-server.herokuapp.com/api/user", {
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       data: { userId: 2 }
  //     })
  //     .then(({ data }) => {
  //       console.log(data);
  //     })
  //     .catch((err: object) => console.log(err));
  // };

  render() {
    const style = { backgroundImage: `url(/static/images/bg06.jpg)` };
    return (
      <PostConsumer>
        {({ state }: any) => (
          <div className="contentsWrap postWrap" style={style}>
            <Search tagDatas={this.state.hashLank} />
            <Post postDatas={state.postDatas} />
            <MoreBtn />
          </div>
        )}
      </PostConsumer>
    );
  }
}

export default PostContainer;
